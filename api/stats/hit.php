<?php
/*
 एक page देखा गया — POST (JSON या text) {p: "/path", r: "referrer", s: "utm_source", v: "visitor id", n: 1 = नई visit}
 जवाब हमेशा 204 (कुछ नहीं), ताकि वेबसाइट धीमी न हो।
*/
require_once __DIR__ . "/_common.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST" || statsIsBot($_SERVER["HTTP_USER_AGENT"] ?? "")) {
    http_response_code(204);
    exit;
}

$raw = file_get_contents("php://input", false, null, 0, 2000);
$d = json_decode((string) $raw, true);
if (!is_array($d)) { http_response_code(204); exit; }

$path = (string) ($d["p"] ?? "");
$path = strtok($path, "?#");
if ($path === false || $path === "" || $path[0] !== "/" || strlen($path) > 190 || strpos($path, "/admin") === 0) {
    http_response_code(204);
    exit;
}
$path = rtrim($path, "/") ?: "/";
$vid = preg_match('/^[a-z0-9]{16}$/', (string) ($d["v"] ?? "")) ? $d["v"] : "";
$day = date("Y-m-d");

statsEnsureTables($conn);

$stmt = $conn->prepare("INSERT INTO site_pageviews_daily (day, path, views) VALUES (?, ?, 1) ON DUPLICATE KEY UPDATE views = views + 1");
if ($stmt) { $stmt->bind_param("ss", $day, $path); $stmt->execute(); $stmt->close(); }

if ($vid !== "") {
    $stmt = $conn->prepare("INSERT IGNORE INTO site_visitors_daily (day, vid) VALUES (?, ?)");
    if ($stmt) { $stmt->bind_param("ss", $day, $vid); $stmt->execute(); $stmt->close(); }
}

if (!empty($d["n"])) {
    $src = statsSource($d["r"] ?? "", $d["s"] ?? "");
    if ($src !== "") {
        $stmt = $conn->prepare("INSERT INTO site_sources_daily (day, source, visits) VALUES (?, ?, 1) ON DUPLICATE KEY UPDATE visits = visits + 1");
        if ($stmt) { $stmt->bind_param("ss", $day, $src); $stmt->execute(); $stmt->close(); }
    }
}

/* कभी-कभी 13 महीने से पुराने visitor नंबर हटाओ (गिनती वाली टेबलें रहती हैं) */
if (mt_rand(1, 500) === 1) {
    $conn->query("DELETE FROM site_visitors_daily WHERE day < DATE_SUB(CURDATE(), INTERVAL 400 DAY)");
}

http_response_code(204);
