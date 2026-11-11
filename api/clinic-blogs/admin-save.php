<?php
/*
 Admin: नया लेख / लेख में बदलाव — POST (multipart form)
 fields: id (बदलाव के लिए), title, title_en, slug, category, excerpt,
         content (HTML), author, status (published|draft), image (file), remove_image (1)
*/
require_once __DIR__ . "/_common.php";
requireAdminLogin();
requirePostMethod();
blogEnsureTable($conn);

if (!function_exists("mb_substr")) {
    function mb_substr($s, $start, $len = null) { return $len === null ? substr($s, $start) : substr($s, $start, $len); }
}

$id = intval($_POST["id"] ?? 0);
$title = trim($_POST["title"] ?? "");
$titleEn = trim($_POST["title_en"] ?? "");
$slugIn = trim($_POST["slug"] ?? "");
$category = substr(preg_replace('/[^a-z0-9-]/', '', strtolower($_POST["category"] ?? "")), 0, 60);
$excerpt = trim(strip_tags($_POST["excerpt"] ?? ""));
$content = blogSanitizeHtml($_POST["content"] ?? "");
$author = trim(strip_tags($_POST["author"] ?? ""));
$status = ($_POST["status"] ?? "published") === "draft" ? "draft" : "published";
$removeImage = ($_POST["remove_image"] ?? "") === "1";

if ($title === "") sendJsonResponse(false, "लेख का शीर्षक (Title) लिखें");
if (trim(strip_tags($content)) === "") sendJsonResponse(false, "लेख का मुख्य भाग (Content) लिखें");

$title = mb_substr($title, 0, 250);
$titleEn = mb_substr($titleEn, 0, 250);
$author = mb_substr($author, 0, 120);
if ($excerpt === "") {
    $excerpt = mb_substr(trim(preg_replace('/\s+/', ' ', html_entity_decode(strip_tags(preg_replace('#</(p|h2|h3|h4|li|blockquote)>|<br\s*/?>#i', " ", $content)), ENT_QUOTES, "UTF-8"))), 0, 220);
}
$excerpt = mb_substr($excerpt, 0, 600);

$slug = blogSlugify($slugIn !== "" ? $slugIn : $titleEn);
$slug = blogUniqueSlug($conn, $slug, $id);

$old = null;
if ($id > 0) {
    $stmt = blogPrepare($conn, "SELECT id, image FROM clinic_blogs WHERE id = ? LIMIT 1");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $rows = blogFetchAll($stmt);
    $stmt->close();
    if (!$rows) sendJsonResponse(false, "लेख नहीं मिला");
    $old = $rows[0];
}

$newImage = blogSaveImage($_FILES["image"] ?? null);
$image = $old ? (string) $old["image"] : "";
if ($newImage !== "") {
    if ($image) blogDeleteImage($image);
    $image = $newImage;
} else if ($removeImage) {
    if ($image) blogDeleteImage($image);
    $image = "";
}

if ($old) {
    $stmt = blogPrepare($conn, "UPDATE clinic_blogs SET slug=?, title=?, title_en=?, category=?, excerpt=?, content=?, image=?, author=?, status=?, updated_at=NOW() WHERE id=?");
    $stmt->bind_param("sssssssssi", $slug, $title, $titleEn, $category, $excerpt, $content, $image, $author, $status, $id);
} else {
    $stmt = blogPrepare($conn, "INSERT INTO clinic_blogs (slug, title, title_en, category, excerpt, content, image, author, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssssss", $slug, $title, $titleEn, $category, $excerpt, $content, $image, $author, $status);
}
if (!$stmt->execute()) {
    if ($newImage) blogDeleteImage($newImage);
    http_response_code(500);
    sendJsonResponse(false, "Database Error", ["detail" => $stmt->error]);
}
if (!$old) $id = $stmt->insert_id;
$stmt->close();

blogOut(["success" => true, "message" => $status === "draft" ? "Draft सेव हो गया" : "लेख प्रकाशित हो गया", "id" => $id, "slug" => $slug, "status" => $status]);
?>
