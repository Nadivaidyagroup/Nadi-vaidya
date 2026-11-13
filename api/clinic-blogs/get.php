<?php
/* सार्वजनिक: एक लेख — GET ?slug=&lang= (lang का अनुवाद हो तो वही, नहीं तो हिंदी) */
require_once __DIR__ . "/_common.php";
requireGetMethod();
blogEnsureTable($conn);

$slug = trim($_GET["slug"] ?? "");
$lang = blogValidLang($_GET["lang"] ?? BLOG_BASE_LANG);
if ($slug === "" || !preg_match('/^[a-z0-9-]{1,160}$/', $slug)) {
    http_response_code(404);
    blogOut(["success" => false, "message" => "Not found"]);
}

$stmt = blogPrepare($conn, "SELECT * FROM clinic_blogs WHERE slug = ? AND status = 'published' AND created_at <= NOW() LIMIT 1");
$stmt->bind_param("s", $slug);
$stmt->execute();
$rows = blogFetchAll($stmt);
$stmt->close();

if (!$rows) {
    http_response_code(404);
    blogOut(["success" => false, "message" => "Not found"]);
}
$post = $rows[0];
$id = (int) $post["id"];
$data = blogRow($post, true);
$data["lang"] = BLOG_BASE_LANG;
$data["langs"] = blogLangsFor($conn, [$id])[$id];

if ($lang !== BLOG_BASE_LANG) {
    $stmt = blogPrepare($conn, "SELECT title, excerpt, content FROM clinic_blog_translations WHERE blog_id = ? AND lang = ? LIMIT 1");
    $stmt->bind_param("is", $id, $lang);
    $stmt->execute();
    $t = blogFetchAll($stmt);
    $stmt->close();
    if ($t) {
        $data["title"] = $t[0]["title"];
        $data["excerpt"] = $t[0]["excerpt"] ?? "";
        $data["content"] = $t[0]["content"] ?? "";
        $data["lang"] = $lang;
    }
}

/* उसी रोग के और लेख (न हों तो नए लेख) */
$cols = "id, slug, title, title_en, category, excerpt, image, author, status, created_at, updated_at";
$cat = (string) ($post["category"] ?? "");
$stmt = blogPrepare($conn, "SELECT $cols FROM clinic_blogs WHERE status = 'published' AND created_at <= NOW() AND id <> ? ORDER BY (category = ?) DESC, created_at DESC LIMIT 3");
$stmt->bind_param("is", $id, $cat);
$stmt->execute();
$related = blogFetchAll($stmt);
$stmt->close();

header("Cache-Control: no-cache");
blogOut(["success" => true, "data" => $data, "related" => blogLocalizeRows($conn, $related, $data["lang"])]);
?>
