<?php
/* सार्वजनिक: प्रकाशित लेखों की सूची — GET ?category=&limit= */
require_once __DIR__ . "/_common.php";
requireGetMethod();
blogEnsureTable($conn);

$category = trim($_GET["category"] ?? "");
$lang = blogValidLang($_GET["lang"] ?? BLOG_BASE_LANG);
$limit = max(1, min(100, intval($_GET["limit"] ?? 60)));

$cols = "id, slug, title, title_en, category, excerpt, image, author, status, created_at, updated_at";
if ($category !== "") {
    $stmt = blogPrepare($conn, "SELECT $cols FROM clinic_blogs WHERE status = 'published' AND category = ? ORDER BY created_at DESC, id DESC LIMIT ?");
    $stmt->bind_param("si", $category, $limit);
} else {
    $stmt = blogPrepare($conn, "SELECT $cols FROM clinic_blogs WHERE status = 'published' ORDER BY created_at DESC, id DESC LIMIT ?");
    $stmt->bind_param("i", $limit);
}
$stmt->execute();
$rows = blogFetchAll($stmt);
$stmt->close();

/* किन रोगों पर लेख हैं (filter के बटन के लिए) */
$cats = [];
$res = $conn->query("SELECT category, COUNT(*) AS n FROM clinic_blogs WHERE status = 'published' AND category <> '' GROUP BY category");
if ($res) while ($c = $res->fetch_assoc()) $cats[$c["category"]] = (int) $c["n"];

header("Cache-Control: no-cache");
blogOut(["success" => true, "data" => blogLocalizeRows($conn, $rows, $lang), "categories" => $cats]);
?>
