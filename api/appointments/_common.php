<?php
/*
=========================================
ONLINE APPOINTMENT — साझा नियम
FILE: api/appointments/_common.php

समय/slot/क्लीनिक के नियम यहीं बदलें:
- OPD: सुबह 8:00 से 1:00 (आख़िरी slot 12:45)
- हर slot 15 मिनट, 1 मरीज़
- करनाल: हर महीने 1–10 तारीख़
- वृंदावन: हर महीने 11 से महीने के अंत तक
- आज से अगले 30 दिन तक की बुकिंग
=========================================
*/

/* कोई भी error हो तो खाली 500 नहीं, साफ़ JSON मिले (जाँच आसान) */
set_exception_handler(function ($e) {
    if (!headers_sent()) {
        http_response_code(500);
        header("Content-Type: application/json");
    }
    echo json_encode([
        "success" => false,
        "message" => "Server error",
        "detail" => get_class($e) . ": " . $e->getMessage(),
    ]);
    exit;
});
register_shutdown_function(function () {
    $err = error_get_last();
    if ($err && in_array($err["type"], [E_ERROR, E_PARSE, E_COMPILE_ERROR, E_CORE_ERROR], true)) {
        if (!headers_sent()) {
            http_response_code(500);
            header("Content-Type: application/json");
        }
        echo json_encode([
            "success" => false,
            "message" => "Server error",
            "detail" => $err["message"] . " (line " . $err["line"] . ")",
        ]);
    }
});

require_once __DIR__ . "/../config/security.php";
require_once __DIR__ . "/../config/db.php";

/* PHP 8.1+ में mysqli errors exception बन जाते हैं; हम खुद errno देखते हैं */
mysqli_report(MYSQLI_REPORT_OFF);

date_default_timezone_set("Asia/Kolkata");

if (!function_exists("mb_strlen")) {
    function mb_strlen($s) { return strlen($s); }
    function mb_substr($s, $start, $len = null) { return $len === null ? substr($s, $start) : substr($s, $start, $len); }
}

/* prepare() fail हो तो साफ़ error */
function apptPrepare($conn, $sql) {
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        http_response_code(500);
        sendJsonResponse(false, "Database Error", ["detail" => $conn->error]);
    }
    return $stmt;
}

/* get_result() हर hosting पर नहीं होता — दोनों तरीके */
function apptFetchAll($stmt) {
    if (method_exists($stmt, "get_result")) {
        $res = $stmt->get_result();
        if ($res !== false) {
            $out = [];
            while ($row = $res->fetch_assoc()) $out[] = $row;
            return $out;
        }
    }
    $meta = $stmt->result_metadata();
    if (!$meta) return [];
    $row = [];
    $refs = [];
    foreach ($meta->fetch_fields() as $f) {
        $row[$f->name] = null;
        $refs[] = &$row[$f->name];
    }
    $stmt->store_result();
    $stmt->bind_result(...$refs);
    $out = [];
    while ($stmt->fetch()) {
        $copy = [];
        foreach ($row as $k => $v) $copy[$k] = $v;
        $out[] = $copy;
    }
    return $out;
}

const APPT_SLOT_MINUTES = 15;
const APPT_START = "08:00";
const APPT_END = "13:00";
const APPT_DAYS_AHEAD = 30;
const APPT_MIN_LEAD_MINUTES = 15;
const APPT_MAX_ACTIVE_PER_PHONE = 2;

$APPT_CLINICS = [
    "karnal" => [
        "name" => "AyurVaidya Wellness, Karnal",
        "phone" => "9992242267",
    ],
    "vrindavan" => [
        "name" => "Vrindavan Swasthya Seva Kendra, Vrindavan",
        "phone" => "8396066555",
    ],
];

/* टेबल पहली बार अपने-आप बन जाती है */
function apptEnsureTable($conn) {
    $sql = "
        CREATE TABLE IF NOT EXISTS appointments (
            id INT PRIMARY KEY AUTO_INCREMENT,
            clinic VARCHAR(20) NOT NULL,
            appt_date DATE NOT NULL,
            appt_time CHAR(5) NOT NULL,
            name VARCHAR(120) NOT NULL,
            phone VARCHAR(15) NOT NULL,
            age VARCHAR(10) DEFAULT NULL,
            gender VARCHAR(10) DEFAULT NULL,
            city VARCHAR(80) DEFAULT NULL,
            problem TEXT DEFAULT NULL,
            status VARCHAR(20) NOT NULL DEFAULT 'booked',
            active TINYINT NULL DEFAULT 1,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE KEY uniq_slot (clinic, appt_date, appt_time, active),
            KEY idx_date (appt_date),
            KEY idx_phone (phone)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ";
    if (!$conn->query($sql)) {
        http_response_code(500);
        sendJsonResponse(false, "Database Error", ["detail" => $conn->error]);
    }
}

/* दिन के सारे slot: ["08:00", "08:15", ...] */
function apptAllSlots() {
    $slots = [];
    $t = strtotime("2000-01-01 " . APPT_START);
    $end = strtotime("2000-01-01 " . APPT_END);
    while ($t < $end) {
        $slots[] = date("H:i", $t);
        $t += APPT_SLOT_MINUTES * 60;
    }
    return $slots;
}

function apptLabel($hhmm) {
    return date("g:i A", strtotime("2000-01-01 " . $hhmm));
}

/* उस तारीख़ को वह क्लीनिक खुला है? */
function apptClinicOpenOn($clinic, $date) {
    $day = (int) date("j", strtotime($date));
    if ($clinic === "karnal") return $day >= 1 && $day <= 10;
    if ($clinic === "vrindavan") return $day >= 11;
    return false;
}

/* तारीख़ सही और बुकिंग की सीमा में है? */
function apptValidDate($date) {
    if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) return false;
    $ts = strtotime($date);
    if ($ts === false || date("Y-m-d", $ts) !== $date) return false;
    $today = strtotime(date("Y-m-d"));
    return $ts >= $today && $ts <= $today + APPT_DAYS_AHEAD * 86400;
}

/* आज के लिए: बीत चुका या बहुत पास का slot नहीं */
function apptSlotNotPast($date, $hhmm) {
    if ($date !== date("Y-m-d")) return true;
    return strtotime("$date $hhmm") > time() + APPT_MIN_LEAD_MINUTES * 60;
}

function apptCleanPhone($phone) {
    $digits = preg_replace('/\D/', '', (string) $phone);
    if (strlen($digits) === 12 && substr($digits, 0, 2) === "91") {
        $digits = substr($digits, 2);
    }
    if (strlen($digits) === 11 && $digits[0] === "0") {
        $digits = substr($digits, 1);
    }
    return preg_match('/^[6-9]\d{9}$/', $digits) ? $digits : "";
}
?>
