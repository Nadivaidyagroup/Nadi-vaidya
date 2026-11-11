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
blogOut(["success" => true, "data" => blogRow($rows[0], true)]);
?>
