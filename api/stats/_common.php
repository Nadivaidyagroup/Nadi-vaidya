<?php
/*
=========================================
वेबसाइट visitor गिनती (अपनी, बिना Google)
FILE: api/stats/_common.php

- कोई नाम / फ़ोन / IP सेव नहीं होता।
- हर browser का एक random नंबर (vid) — केवल "कितने अलग लोग" गिनने के लिए।
- टेबलें पहली बार अपने-आप बनती हैं।
=========================================
*/

set_exception_handler(function ($e) {
    if (!headers_sent()) {
        http_response_code(500);
        header("Content-Type: application/json");
    }
    echo json_encode(["success" => false, "message" => "Server error"]);
    exit;
});

require_once __DIR__ . "/../config/security.php";
require_once __DIR__ . "/../config/db.php";

mysqli_report(MYSQLI_REPORT_OFF);
date_default_timezone_set("Asia/Kolkata");
$conn->query("SET time_zone = '+05:30'");

/* get_result() हर hosting पर नहीं होता — दोनों तरीके */
function statsFetchAll($stmt) {
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

function statsEnsureTables($conn) {
    $sqls = [
        "CREATE TABLE IF NOT EXISTS site_pageviews_daily (
            day DATE NOT NULL,
            path VARCHAR(190) NOT NULL,
            views INT NOT NULL DEFAULT 0,
            PRIMARY KEY (day, path)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",
        "CREATE TABLE IF NOT EXISTS site_sources_daily (
            day DATE NOT NULL,
            source VARCHAR(40) NOT NULL,
            visits INT NOT NULL DEFAULT 0,
            PRIMARY KEY (day, source)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",
        "CREATE TABLE IF NOT EXISTS site_visitors_daily (
            day DATE NOT NULL,
            vid CHAR(16) NOT NULL,
            PRIMARY KEY (day, vid)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",
    ];
    foreach ($sqls as $sql) {
        if (!$conn->query($sql)) {
            http_response_code(500);
            sendJsonResponse(false, "Database Error");
        }
    }
}

/* visitor कहाँ से आया */
function statsSource($ref, $utm) {
    $utm = strtolower(trim((string) $utm));
    if ($utm !== "" && preg_match('/^[a-z0-9_-]{1,30}$/', $utm)) return $utm;

    $host = strtolower((string) parse_url((string) $ref, PHP_URL_HOST));
    if ($host === "") return "direct";
    $host = preg_replace('/^(www\.|m\.|l\.|lm\.)/', "", $host);
    if (preg_match('/(^|\.)nadivaidya\.in$/', $host)) return "";           /* साइट के अंदर से */
    $map = [
        "google" => '/(^|\.)google\./',
        "bing" => '/(^|\.)bing\.com$/',
        "facebook" => '/(^|\.)(facebook\.com|fb\.com|fb\.me)$/',
        "instagram" => '/(^|\.)instagram\.com$/',
        "whatsapp" => '/(^|\.)(whatsapp\.com|wa\.me|wl\.co)$/',
        "youtube" => '/(^|\.)(youtube\.com|youtu\.be)$/',
        "twitter" => '/(^|\.)(twitter\.com|x\.com|t\.co)$/',
        "nadivaidya.com" => '/(^|\.)nadivaidya\.com$/',
    ];
    foreach ($map as $name => $re) {
        if (preg_match($re, $host)) return $name;
    }
    return substr($host, 0, 40);
}

function statsIsBot($ua) {
    $ua = strtolower((string) $ua);
    return $ua === "" || preg_match('/bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp|headless|lighthouse|python|curl|wget/', $ua);
}
?>
