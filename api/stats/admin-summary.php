<?php
/* Admin: visitor रिपोर्ट — GET ?days=30 */
require_once __DIR__ . "/_common.php";
requireAdminLogin();
statsEnsureTables($conn);

$days = max(1, min(365, intval($_GET["days"] ?? 30)));
$from = date("Y-m-d", strtotime("-" . ($days - 1) . " days"));

$daily = [];
for ($t = strtotime($from); $t <= time(); $t += 86400) {
    $daily[date("Y-m-d", $t)] = ["day" => date("Y-m-d", $t), "views" => 0, "visitors" => 0, "visits" => 0];
}
$q = function ($sql) use ($conn, $from) {
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $from);
    $stmt->execute();
    $rows = statsFetchAll($stmt);
    $stmt->close();
    return $rows;
};
foreach ($q("SELECT day, SUM(views) n FROM site_pageviews_daily WHERE day >= ? GROUP BY day") as $r) if (isset($daily[$r["day"]])) $daily[$r["day"]]["views"] = (int) $r["n"];
foreach ($q("SELECT day, COUNT(*) n FROM site_visitors_daily WHERE day >= ? GROUP BY day") as $r) if (isset($daily[$r["day"]])) $daily[$r["day"]]["visitors"] = (int) $r["n"];
foreach ($q("SELECT day, SUM(visits) n FROM site_sources_daily WHERE day >= ? GROUP BY day") as $r) if (isset($daily[$r["day"]])) $daily[$r["day"]]["visits"] = (int) $r["n"];

$uniq = $q("SELECT COUNT(DISTINCT vid) n FROM site_visitors_daily WHERE day >= ?");
$pages = $q("SELECT path, SUM(views) views FROM site_pageviews_daily WHERE day >= ? GROUP BY path ORDER BY views DESC LIMIT 25");
$sources = $q("SELECT source, SUM(visits) visits FROM site_sources_daily WHERE day >= ? GROUP BY source ORDER BY visits DESC LIMIT 20");

$daily = array_values($daily);
echo json_encode([
    "success" => true,
    "days" => $days,
    "totals" => [
        "views" => array_sum(array_column($daily, "views")),
        "visits" => array_sum(array_column($daily, "visits")),
        "visitors" => (int) ($uniq[0]["n"] ?? 0),
    ],
    "daily" => $daily,
    "pages" => array_map(fn($r) => ["path" => $r["path"], "views" => (int) $r["views"]], $pages),
    "sources" => array_map(fn($r) => ["source" => $r["source"], "visits" => (int) $r["visits"]], $sources),
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
