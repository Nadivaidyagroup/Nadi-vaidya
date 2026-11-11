<?php
/* Admin: सारे लेख (draft भी) */
require_once __DIR__ . "/_common.php";
requireAdminLogin();
blogEnsureTable($conn);

$res = $conn->query("SELECT id, slug, title, title_en, category, excerpt, image, author, status, created_at, updated_at FROM clinic_blogs ORDER BY created_at DESC, id DESC");
$rows = [];
if ($res) while ($r = $res->fetch_assoc()) $rows[] = blogRow($r);
blogOut(["success" => true, "data" => $rows]);
?>
