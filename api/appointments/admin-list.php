<?php
/*
GET /api/appointments/admin-list.php?from=2026-11-01&to=2026-11-07&clinic=karnal
सिर्फ़ admin login के बाद। बिना from/to → आज से आगे की सारी।
*/

require_once __DIR__ . "/_common.php";

requireAdminLogin();
requireGetMethod();
apptEnsureTable($conn);

$from = trim($_GET["from"] ?? "");
$to = trim($_GET["to"] ?? "");
$clinic = trim($_GET["clinic"] ?? "");

$isDate = function ($d) {
    return (bool) preg_match('/^\d{4}-\d{2}-\d{2}$/', $d);
};

if (!$isDate($from)) $from = date("Y-m-d");
if (!$isDate($to)) $to = "2100-01-01";

$sql = "SELECT id, clinic, appt_date, appt_time, name, phone, age, gender,
               city, problem, status, created_at
        FROM appointments
        WHERE appt_date BETWEEN ? AND ?";
$types = "ss";
$params = [$from, $to];

if (isset($APPT_CLINICS[$clinic])) {
    $sql .= " AND clinic = ?";
    $types .= "s";
    $params[] = $clinic;
}

$sql .= " ORDER BY appt_date ASC, appt_time ASC, id ASC LIMIT 2000";

$stmt = $conn->prepare($sql);
$stmt->bind_param($types, ...$params);
$stmt->execute();
$res = $stmt->get_result();

$rows = [];
while ($row = $res->fetch_assoc()) {
    $row["time_label"] = apptLabel($row["appt_time"]);
    $rows[] = $row;
}

sendJsonResponse(true, "OK", ["count" => count($rows), "data" => $rows]);
?>
