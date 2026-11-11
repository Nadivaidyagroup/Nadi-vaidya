<?php
/* Admin: एक लेख edit के लिए — GET ?id= */
require_once __DIR__ . "/_common.php";
requireAdminLogin();
blogEnsureTable($conn);

$id = intval($_GET["id"] ?? 0);
$stmt = blogPrepare($conn, "SELECT * FROM clinic_blogs WHERE id = ? LIMIT 1");
$stmt->bind_param("i", $id);
$stmt->execute();
$rows = blogFetchAll($stmt);
$stmt->close();
if (!$rows) {
    http_response_code(404);
    blogOut(["success" => false, "message" => "लेख नहीं मिला"]);
}
$data = blogRow($rows[0], true);

/* सारे अनुवाद */
$stmt = blogPrepare($conn, "SELECT lang, title, excerpt, content, updated_at FROM clinic_blog_translations WHERE blog_id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$tr = [];
foreach (blogFetchAll($stmt) as $t) $tr[$t["lang"]] = $t;
$stmt->close();
$data["translations"] = (object) $tr;

blogOut(["success" => true, "data" => $data]);
?>
