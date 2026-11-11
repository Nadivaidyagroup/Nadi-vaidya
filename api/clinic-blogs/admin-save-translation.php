<?php
/*
 Admin: किसी लेख का एक भाषा में अनुवाद सेव करना — POST JSON
 {id, lang, title, excerpt, content}   (content खाली = उस भाषा का अनुवाद हटाना)
*/
require_once __DIR__ . "/_common.php";
requireAdminLogin();
requirePostMethod();
blogEnsureTable($conn);

if (!function_exists("mb_substr")) {
    function mb_substr($s, $start, $len = null) { return $len === null ? substr($s, $start) : substr($s, $start, $len); }
}

$data = getJsonInput() ?: [];
$id = intval($data["id"] ?? 0);
$lang = (string) ($data["lang"] ?? "");
if (!in_array($lang, BLOG_LANGS, true) || $lang === BLOG_BASE_LANG) {
    sendJsonResponse(false, "भाषा सही नहीं है");
}

$stmt = blogPrepare($conn, "SELECT id FROM clinic_blogs WHERE id = ? LIMIT 1");
$stmt->bind_param("i", $id);
$stmt->execute();
$rows = blogFetchAll($stmt);
$stmt->close();
if (!$rows) sendJsonResponse(false, "पहले हिंदी लेख सेव करें");

$title = mb_substr(trim(strip_tags((string) ($data["title"] ?? ""))), 0, 250);
$excerpt = mb_substr(trim(strip_tags((string) ($data["excerpt"] ?? ""))), 0, 600);
$content = (string) ($data["content"] ?? "");
$empty = trim(strip_tags($content)) === "";

if (!$empty && $title === "") sendJsonResponse(false, "इस भाषा में शीर्षक भी लिखें");

if (!blogSaveTranslation($conn, $id, $lang, $title, $excerpt, $content)) {
    http_response_code(500);
    sendJsonResponse(false, "Database Error");
}
sendJsonResponse(true, $empty ? "अनुवाद हटा दिया गया" : "अनुवाद सेव हो गया");
