<?php
/* Admin: लेख हटाना — POST JSON {id} */
require_once __DIR__ . "/_common.php";
requireAdminLogin();
requirePostMethod();
blogEnsureTable($conn);

$data = getJsonInput();
$id = intval($data["id"] ?? 0);

$stmt = blogPrepare($conn, "SELECT image FROM clinic_blogs WHERE id = ? LIMIT 1");
$stmt->bind_param("i", $id);
$stmt->execute();
$rows = blogFetchAll($stmt);
$stmt->close();
if (!$rows) sendJsonResponse(false, "लेख नहीं मिला");

$stmt = blogPrepare($conn, "DELETE FROM clinic_blog_translations WHERE blog_id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$stmt->close();

$stmt = blogPrepare($conn, "DELETE FROM clinic_blogs WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$stmt->close();
blogDeleteImage($rows[0]["image"] ?? "");

sendJsonResponse(true, "लेख हटा दिया गया");
?>
