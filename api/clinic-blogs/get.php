<?php
/* सार्वजनिक: एक लेख — GET ?slug= */
require_once __DIR__ . "/_common.php";
requireGetMethod();
blogEnsureTable($conn);

$slug = trim($_GET["slug"] ?? "");
if ($slug === "" || !preg_match('/^[a-z0-9-]{1,160}$/', $slug)) {
    http_response_code(404);
    blogOut(["success" => false, "message" => "Not found"]);
}

$stmt = blogPrepare($conn, "SELECT * FROM clinic_blogs WHERE slug = ? AND status = 'published' LIMIT 1");
$stmt->bind_param("s", $slug);
$stmt->execute();
$rows = blogFetchAll($stmt);
$stmt->close();

if (!$rows) {
    http_response_code(404);
    blogOut(["success" => false, "message" => "Not found"]);
}
$post = $rows[0];

/* उसी रोग के और लेख (न हों तो नए लेख) */
$cols = "id, slug, title, title_en, category, excerpt, image, author, status, created_at, updated_at";
$id = (int) $post["id"];
$cat = (string) ($post["category"] ?? "");
$stmt = blogPrepare($conn, "SELECT $cols FROM clinic_blogs WHERE status = 'published' AND id <> ? ORDER BY (category = ?) DESC, created_at DESC LIMIT 3");
$stmt->bind_param("is", $id, $cat);
$stmt->execute();
$related = blogFetchAll($stmt);
$stmt->close();

header("Cache-Control: no-cache");
blogOut(["success" => true, "data" => blogRow($post, true), "related" => array_map("blogRow", $related)]);
?>
