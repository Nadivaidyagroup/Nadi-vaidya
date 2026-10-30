<?php

header("Content-Type: application/json");

/*
=========================================
BLOG DETAILS API
FILE:
single-blog.php
=========================================
*/

/*
=========================================
SECURITY
=========================================
*/

require_once "../config/security.php";

/*
=========================================
DB CONNECTION
=========================================
*/

require_once "../config/db.php";

/*
=========================================
REQUIRE ADMIN LOGIN
=========================================
*/

requireAdminLogin();

/*
=========================================
CHECK ID
=========================================
*/

$id =
    intval($_GET["id"] ?? 0);

if ($id <= 0) {

    echo json_encode([

        "success" => false,

        "message" => "Invalid Blog ID"

    ]);

    exit();

}

/*
=========================================
GET BLOG
=========================================
*/

$stmt = $conn->prepare(

    "SELECT *
     FROM blogs
     WHERE id = ?
     LIMIT 1"

);

$stmt->bind_param(
    "i",
    $id
);

$stmt->execute();

$result =
    $stmt->get_result();

/*
=========================================
BLOG NOT FOUND
=========================================
*/

if ($result->num_rows === 0) {

    echo json_encode([

        "success" => false,

        "message" => "Blog Not Found"

    ]);

    exit();

}

/*
=========================================
FETCH BLOG
=========================================
*/

$row =
    $result->fetch_assoc();

/*
=========================================
IMAGE URL
=========================================
*/

$image =
    $row["image"] ?? "";

/*
=========================================
ADD FULL LIVE URL ONLY ONCE
=========================================
*/

if (

    !empty($image) &&

    !str_contains($image, "http")

) {

    $protocol =

        (!empty($_SERVER["HTTPS"]) &&
        $_SERVER["HTTPS"] !== "off")

        ? "https://"

        : "http://";

    $domain =
        $_SERVER["HTTP_HOST"];

    $image =

        $protocol .
        $domain . "/" .

        ltrim($image, "/");

}

/*
=========================================
RETURN RESPONSE
=========================================
*/

echo json_encode([

    "success" => true,

    "blog" => [

        "id" =>
            $row["id"] ?? "",

        "title" =>
            $row["title"] ?? "",

        "slug" =>
            $row["slug"] ?? "",

        "category" =>
            $row["category"] ?? "",

        "author" =>
            $row["author"] ?? "",

        "image" =>
            $image,

        "excerpt" =>
            $row["excerpt"] ?? "",

        "content" =>
            $row["content"] ?? "",

        "date" =>
            $row["created_at"]
            ?? date("Y-m-d")

    ]

],

JSON_UNESCAPED_UNICODE |
JSON_UNESCAPED_SLASHES

);

/*
=========================================
CLOSE
=========================================
*/

$stmt->close();

$conn->close();

?>