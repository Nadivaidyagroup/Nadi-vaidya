<?php
/*
=========================================
क्लीनिक ब्लॉग (स्वास्थ्य लेख) — साझा नियम
FILE: api/clinic-blogs/_common.php

- टेबल: clinic_blogs (पहली बार अपने-आप बनती है)
  database में पुरानी साइट की "blogs" टेबल अलग है — उसे नहीं छूते।
- फ़ोटो: /uploads/blogs/ में (deploy इस फ़ोल्डर को नहीं छूता)
=========================================
*/

set_exception_handler(function ($e) {
    if (!headers_sent()) {
        http_response_code(500);
        header("Content-Type: application/json");
    }
    echo json_encode(["success" => false, "message" => "Server error", "detail" => $e->getMessage()]);
    exit;
});

require_once __DIR__ . "/../config/security.php";
require_once __DIR__ . "/../config/db.php";

mysqli_report(MYSQLI_REPORT_OFF);
date_default_timezone_set("Asia/Kolkata");
/* लेख की तारीख़ भारत के समय से (hosting का MySQL किसी और time zone में हो सकता है) */
$conn->query("SET time_zone = '+05:30'");

/* "2026-11-14 09:00" या "2026-11-14T09:00" → "2026-11-14 09:00:00" (भारत का समय); गलत हो तो "" */
function blogParsePublishAt($v) {
    $v = trim(str_replace("T", " ", (string) $v));
    if ($v === "") return "";
    if (preg_match('/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/', $v)) $v .= ":00";
    if (!preg_match('/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/', $v)) return "";
    $ts = strtotime($v);
    return $ts ? date("Y-m-d H:i:s", $ts) : "";
}

/* लेख की भाषाएँ — मूल लेख हिंदी (hi) में; बाकी अनुवाद clinic_blog_translations में */
const BLOG_BASE_LANG = "hi";
const BLOG_LANGS = ["hi", "en", "pa", "gu", "mr", "bn", "ta", "te", "kn", "ml", "or", "as"];

function blogValidLang($lang) {
    return in_array($lang, BLOG_LANGS, true) ? $lang : BLOG_BASE_LANG;
}

const BLOG_MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const BLOG_UPLOAD_DIR = __DIR__ . "/../../uploads/blogs/";
const BLOG_UPLOAD_URL = "/uploads/blogs/";

function blogEnsureTable($conn) {
    $sql = "
        CREATE TABLE IF NOT EXISTS clinic_blogs (
            id INT PRIMARY KEY AUTO_INCREMENT,
            slug VARCHAR(160) NOT NULL,
            title VARCHAR(255) NOT NULL,
            title_en VARCHAR(255) DEFAULT NULL,
            category VARCHAR(60) DEFAULT NULL,
            excerpt TEXT DEFAULT NULL,
            content MEDIUMTEXT DEFAULT NULL,
            image VARCHAR(255) DEFAULT NULL,
            author VARCHAR(120) DEFAULT NULL,
            status VARCHAR(12) NOT NULL DEFAULT 'published',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NULL DEFAULT NULL,
            UNIQUE KEY uniq_slug (slug),
            KEY idx_status (status, created_at),
            KEY idx_category (category)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ";
    if (!$conn->query($sql)) {
        http_response_code(500);
        sendJsonResponse(false, "Database Error", ["detail" => $conn->error]);
    }
    $sql = "
        CREATE TABLE IF NOT EXISTS clinic_blog_translations (
            blog_id INT NOT NULL,
            lang VARCHAR(5) NOT NULL,
            title VARCHAR(255) NOT NULL,
            excerpt TEXT DEFAULT NULL,
            content MEDIUMTEXT DEFAULT NULL,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (blog_id, lang)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ";
    if (!$conn->query($sql)) {
        http_response_code(500);
        sendJsonResponse(false, "Database Error", ["detail" => $conn->error]);
    }
    blogRunSeeds($conn);
}

/* अनुवाद सेव करना (खाली content = अनुवाद हटाना) */
function blogSaveTranslation($conn, $blogId, $lang, $title, $excerpt, $content, $onlyIfMissing = false) {
    $content = blogSanitizeHtml($content);
    if (trim(strip_tags($content)) === "" || trim($title) === "") {
        if ($onlyIfMissing) return false;
        $stmt = blogPrepare($conn, "DELETE FROM clinic_blog_translations WHERE blog_id = ? AND lang = ?");
        $stmt->bind_param("is", $blogId, $lang);
        $stmt->execute();
        $stmt->close();
        return true;
    }
    $sql = $onlyIfMissing
        ? "INSERT IGNORE INTO clinic_blog_translations (blog_id, lang, title, excerpt, content) VALUES (?, ?, ?, ?, ?)"
        : "INSERT INTO clinic_blog_translations (blog_id, lang, title, excerpt, content) VALUES (?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE title = VALUES(title), excerpt = VALUES(excerpt), content = VALUES(content), updated_at = NOW()";
    $stmt = blogPrepare($conn, $sql);
    $stmt->bind_param("issss", $blogId, $lang, $title, $excerpt, $content);
    $ok = $stmt->execute();
    $stmt->close();
    return $ok;
}

/* किन लेखों के किन भाषाओं में अनुवाद हैं: [blog_id => ["hi","en",...]] */
function blogLangsFor($conn, $ids) {
    $out = [];
    $ids = array_values(array_filter(array_map("intval", $ids)));
    foreach ($ids as $id) $out[$id] = [BLOG_BASE_LANG];
    if (!$ids) return $out;
    $res = $conn->query("SELECT blog_id, lang FROM clinic_blog_translations WHERE blog_id IN (" . implode(",", $ids) . ")");
    if ($res) while ($r = $res->fetch_assoc()) $out[(int) $r["blog_id"]][] = $r["lang"];
    foreach ($out as $id => $langs) {
        $out[$id] = array_values(array_filter(BLOG_LANGS, fn($l) => in_array($l, $langs, true)));
    }
    return $out;
}

/* सूची की rows में चुनी भाषा का शीर्षक/सार (हो तो) और उपलब्ध भाषाएँ जोड़ना */
function blogLocalizeRows($conn, $rows, $lang) {
    $ids = array_map(fn($r) => (int) $r["id"], $rows);
    $langs = blogLangsFor($conn, $ids);
    $tr = [];
    if ($lang !== BLOG_BASE_LANG && $ids) {
        $stmt = blogPrepare($conn, "SELECT blog_id, title, excerpt FROM clinic_blog_translations WHERE lang = ? AND blog_id IN (" . implode(",", $ids) . ")");
        $stmt->bind_param("s", $lang);
        $stmt->execute();
        foreach (blogFetchAll($stmt) as $t) $tr[(int) $t["blog_id"]] = $t;
        $stmt->close();
    }
    $out = [];
    foreach ($rows as $r) {
        $row = blogRow($r);
        $id = $row["id"];
        $row["langs"] = $langs[$id] ?? [BLOG_BASE_LANG];
        $row["lang"] = BLOG_BASE_LANG;
        if (isset($tr[$id])) {
            $row["title"] = $tr[$id]["title"];
            $row["excerpt"] = $tr[$id]["excerpt"] ?? "";
            $row["lang"] = $lang;
        }
        $out[] = $row;
    }
    return $out;
}

/*
 seed/*.json में रखे लेख (जो code के साथ आते हैं) पहली बार अपने-आप प्रकाशित होते हैं।
 हर फ़ाइल केवल एक बार डाली जाती है — admin बाद में उसे बदले या हटाए तो वापस नहीं आएगी।
*/
function blogRunSeeds($conn) {
    $files = glob(__DIR__ . "/seed/*.json");
    if (!$files) return;
    $conn->query("CREATE TABLE IF NOT EXISTS clinic_blog_seeds (
        seed VARCHAR(160) PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    $done = [];
    $res = $conn->query("SELECT seed FROM clinic_blog_seeds");
    if (!$res) return;
    while ($r = $res->fetch_assoc()) $done[$r["seed"]] = true;

    /* पहले मूल (हिंदी) लेख, फिर अनुवाद — ताकि अनुवाद को उसका लेख मिल जाए */
    $todo = [];
    foreach ($files as $file) {
        $seed = basename($file, ".json");
        if (isset($done[$seed])) continue;
        $p = json_decode((string) file_get_contents($file), true);
        if (!is_array($p) || empty($p["slug"]) || empty($p["title"])) continue;
        $todo[] = [$seed, $p];
    }
    usort($todo, fn($a, $b) => (int) (($a[1]["lang"] ?? BLOG_BASE_LANG) !== BLOG_BASE_LANG) - (int) (($b[1]["lang"] ?? BLOG_BASE_LANG) !== BLOG_BASE_LANG));

    foreach ($todo as [$seed, $p]) {

        $slug = blogSlugify($p["slug"]);
        $lang = (string) ($p["lang"] ?? BLOG_BASE_LANG);

        /* अनुवाद वाली फ़ाइल: {"slug", "lang", "title", "excerpt", "content"} */
        if ($lang !== BLOG_BASE_LANG) {
            if (!in_array($lang, BLOG_LANGS, true)) continue;
            $stmt = blogPrepare($conn, "SELECT id FROM clinic_blogs WHERE slug = ? LIMIT 1");
            $stmt->bind_param("s", $slug);
            $stmt->execute();
            $post = blogFetchAll($stmt);
            $stmt->close();
            if (!$post) continue; /* मूल लेख अभी नहीं है — बाद में फिर कोशिश */
            blogSaveTranslation($conn, (int) $post[0]["id"], $lang, (string) $p["title"], (string) ($p["excerpt"] ?? ""), (string) ($p["content"] ?? ""), true);
            $stmt = blogPrepare($conn, "INSERT IGNORE INTO clinic_blog_seeds (seed) VALUES (?)");
            $stmt->bind_param("s", $seed);
            $stmt->execute();
            $stmt->close();
            continue;
        }
        $stmt = blogPrepare($conn, "SELECT id FROM clinic_blogs WHERE slug = ? LIMIT 1");
        $stmt->bind_param("s", $slug);
        $stmt->execute();
        $exists = blogFetchAll($stmt);
        $stmt->close();

        if (!$exists) {
            $title = (string) $p["title"];
            $titleEn = (string) ($p["title_en"] ?? "");
            $category = (string) ($p["category"] ?? "");
            $excerpt = (string) ($p["excerpt"] ?? "");
            $content = blogSanitizeHtml($p["content"] ?? "");
            $image = (string) ($p["image"] ?? "");
            $author = (string) ($p["author"] ?? "");
            $status = ($p["status"] ?? "published") === "draft" ? "draft" : "published";
            /* publish_at: इस समय (IST) से पहले लेख वेबसाइट पर नहीं दिखेगा */
            $publishAt = blogParsePublishAt($p["publish_at"] ?? "") ?: date("Y-m-d H:i:s");
            $stmt = blogPrepare($conn, "INSERT INTO clinic_blogs (slug, title, title_en, category, excerpt, content, image, author, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("ssssssssss", $slug, $title, $titleEn, $category, $excerpt, $content, $image, $author, $status, $publishAt);
            if (!$stmt->execute()) { $stmt->close(); continue; }
            $stmt->close();
        }
        $stmt = blogPrepare($conn, "INSERT IGNORE INTO clinic_blog_seeds (seed) VALUES (?)");
        $stmt->bind_param("s", $seed);
        $stmt->execute();
        $stmt->close();
    }
}

function blogPrepare($conn, $sql) {
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        http_response_code(500);
        sendJsonResponse(false, "Database Error", ["detail" => $conn->error]);
    }
    return $stmt;
}

/* get_result() हर hosting पर नहीं होता — दोनों तरीके */
function blogFetchAll($stmt) {
    if (method_exists($stmt, "get_result")) {
        $res = $stmt->get_result();
        if ($res !== false) {
            $out = [];
            while ($row = $res->fetch_assoc()) $out[] = $row;
            return $out;
        }
    }
    $meta = $stmt->result_metadata();
    if (!$meta) return [];
    $row = [];
    $refs = [];
    foreach ($meta->fetch_fields() as $f) {
        $row[$f->name] = null;
        $refs[] = &$row[$f->name];
    }
    $stmt->store_result();
    $stmt->bind_result(...$refs);
    $out = [];
    while ($stmt->fetch()) {
        $copy = [];
        foreach ($row as $k => $v) $copy[$k] = $v;
        $out[] = $copy;
    }
    return $out;
}

function blogOut($data) {
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/* English शब्दों से URL बनाना: "Knee Pain Ayurveda" → "knee-pain-ayurveda" */
function blogSlugify($text) {
    $s = strtolower(trim((string) $text));
    $s = preg_replace('/[^a-z0-9]+/', '-', $s);
    $s = trim($s, '-');
    return substr($s, 0, 120);
}

/* slug पहले से है तो -2, -3 ... जोड़ दो */
function blogUniqueSlug($conn, $slug, $ignoreId = 0) {
    $base = $slug !== "" ? $slug : "lekh-" . date("Ymd-His");
    $try = $base;
    for ($i = 2; $i < 100; $i++) {
        $stmt = blogPrepare($conn, "SELECT id FROM clinic_blogs WHERE slug = ? AND id <> ? LIMIT 1");
        $stmt->bind_param("si", $try, $ignoreId);
        $stmt->execute();
        $rows = blogFetchAll($stmt);
        $stmt->close();
        if (!$rows) return $try;
        $try = $base . "-" . $i;
    }
    return $base . "-" . time();
}

/*
 लेख का HTML साफ़ करना — केवल सामान्य formatting रहे,
 कोई script / onclick / iframe वगैरह नहीं।
*/
function blogSanitizeHtml($html) {
    $html = (string) $html;
    if (trim($html) === "") return "";

    $allowed = [
        "p" => [], "br" => [], "h2" => [], "h3" => [], "h4" => [],
        "strong" => [], "b" => [], "em" => [], "i" => [], "u" => [],
        "ul" => [], "ol" => [], "li" => ["data-list"],
        "blockquote" => [], "a" => ["href"],
    ];

    if (!class_exists("DOMDocument")) {
        $html = strip_tags($html, "<p><br><h2><h3><h4><strong><b><em><i><u><ul><ol><li><blockquote><a>");
        $html = preg_replace('/\s+(on\w+|style|class|id)\s*=\s*("[^"]*"|\'[^\']*\'|[^\s>]+)/i', '', $html);
        $html = preg_replace('/href\s*=\s*("|\')\s*(javascript|data|vbscript):[^"\']*\1/i', 'href="#"', $html);
        return $html;
    }

    $doc = new DOMDocument();
    libxml_use_internal_errors(true);
    $doc->loadHTML('<?xml encoding="UTF-8"><div id="blog-root">' . $html . '</div>', LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
    libxml_clear_errors();
    $root = $doc->getElementById("blog-root");
    if (!$root) return "";

    $walk = function ($node) use (&$walk, $allowed, $doc) {
        for ($i = $node->childNodes->length - 1; $i >= 0; $i--) {
            $child = $node->childNodes->item($i);
            if ($child->nodeType === XML_COMMENT_NODE) {
                $node->removeChild($child);
                continue;
            }
            if ($child->nodeType !== XML_ELEMENT_NODE) continue;

            $tag = strtolower($child->nodeName);

            /* Quill के अंदरूनी निशान और ख़तरनाक tags — पूरा हटाओ */
            if (in_array($tag, ["script", "style", "iframe", "object", "embed", "form", "input", "button", "textarea", "select", "img", "video", "audio", "svg", "math", "link", "meta"], true)
                || ($tag === "span" && strpos((string) $child->getAttribute("class"), "ql-ui") !== false)) {
                $node->removeChild($child);
                continue;
            }

            $walk($child);

            if (!isset($allowed[$tag])) {
                /* अनजान tag (जैसे span/div) हटाओ, अंदर का text रखो */
                while ($child->firstChild) {
                    $node->insertBefore($child->firstChild, $child);
                }
                $node->removeChild($child);
                continue;
            }

            for ($a = $child->attributes->length - 1; $a >= 0; $a--) {
                $name = strtolower($child->attributes->item($a)->nodeName);
                if (!in_array($name, $allowed[$tag], true)) {
                    $child->removeAttribute($child->attributes->item($a)->nodeName);
                }
            }

            if ($tag === "li" && $child->hasAttribute("data-list")) {
                $v = $child->getAttribute("data-list");
                if (!in_array($v, ["bullet", "ordered"], true)) $child->removeAttribute("data-list");
            }

            if ($tag === "a") {
                $href = trim($child->getAttribute("href"));
                if (!preg_match('#^(https?://|mailto:|tel:|/)#i', $href)) {
                    $child->removeAttribute("href");
                } else if (preg_match('#^https?://#i', $href)) {
                    $child->setAttribute("target", "_blank");
                    $child->setAttribute("rel", "noopener noreferrer");
                }
            }
        }
    };
    $walk($root);

    $out = "";
    foreach ($root->childNodes as $c) $out .= $doc->saveHTML($c);
    return trim($out);
}

/* cover फ़ोटो सेव करना (jpg/png/webp, 5 MB तक) — सफल हो तो "/uploads/blogs/xyz.jpg" */
function blogSaveImage($file) {
    if (!isset($file) || !is_array($file) || ($file["error"] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) {
        return "";
    }
    if ($file["error"] !== UPLOAD_ERR_OK) {
        sendJsonResponse(false, "फ़ोटो upload नहीं हुई (बहुत बड़ी हो सकती है — 5 MB तक की फ़ोटो लगाएँ)");
    }
    if ($file["size"] > BLOG_MAX_IMAGE_BYTES) {
        sendJsonResponse(false, "फ़ोटो 5 MB से छोटी होनी चाहिए");
    }
    $info = @getimagesize($file["tmp_name"]);
    $types = [IMAGETYPE_JPEG => "jpg", IMAGETYPE_PNG => "png", IMAGETYPE_WEBP => "webp"];
    if (!$info || !isset($types[$info[2]])) {
        sendJsonResponse(false, "केवल JPG, PNG या WEBP फ़ोटो लगाएँ");
    }
    if (!is_dir(BLOG_UPLOAD_DIR)) {
        @mkdir(BLOG_UPLOAD_DIR, 0755, true);
    }
    $ht = BLOG_UPLOAD_DIR . ".htaccess";
    if (!file_exists($ht)) {
        @file_put_contents($ht, "Options -Indexes\n<FilesMatch \"\\.(php|phtml|phar|pl|py|cgi|sh)$\">\n  Require all denied\n</FilesMatch>\n");
    }
    $name = date("Ymd") . "-" . bin2hex(random_bytes(6)) . "." . $types[$info[2]];
    if (!move_uploaded_file($file["tmp_name"], BLOG_UPLOAD_DIR . $name)) {
        http_response_code(500);
        sendJsonResponse(false, "फ़ोटो server पर सेव नहीं हो पाई");
    }
    return BLOG_UPLOAD_URL . $name;
}

function blogDeleteImage($path) {
    if (!$path || strpos($path, BLOG_UPLOAD_URL) !== 0) return;
    $file = BLOG_UPLOAD_DIR . basename($path);
    if (is_file($file)) @unlink($file);
}

/* DB की row → API वाला रूप */
function blogRow($r, $withContent = false) {
    $out = [
        "id" => (int) $r["id"],
        "slug" => $r["slug"],
        "title" => $r["title"],
        "title_en" => $r["title_en"] ?? "",
        "category" => $r["category"] ?? "",
        "excerpt" => $r["excerpt"] ?? "",
        "image" => $r["image"] ?? "",
        "author" => $r["author"] ?? "",
        "status" => $r["status"] ?? "published",
        "created_at" => $r["created_at"] ?? "",
        "scheduled" => !empty($r["created_at"]) && strtotime($r["created_at"]) > time(),
        "updated_at" => $r["updated_at"] ?? "",
    ];
    if ($withContent) $out["content"] = $r["content"] ?? "";
    return $out;
}
?>
