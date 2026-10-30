<?php

header("Content-Type: application/json");

/*
=========================================
CONTACT FORMS API
FILE:
contact-forms.php
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
GET BLOGS
=========================================
*/

$sql = "

SELECT *

FROM blogs

ORDER BY id DESC

";

$result =
    $conn->query($sql);

/*
=========================================
STORE BLOGS
=========================================
*/

$blogs = [];

/*
=========================================
FETCH DATA
=========================================
*/

if (

    $result &&
    $result->num_rows > 0

) {

    while (

        $row =
            $result->fetch_assoc()

    ) {

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
        STORE BLOG
        =========================================
        */

        $blogs[] = [

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

        ];

    }

}

/*
=========================================
RETURN JSON
=========================================
*/

echo json_encode(

    $blogs,

    JSON_UNESCAPED_UNICODE |
    JSON_UNESCAPED_SLASHES

);

/*
=========================================
CLOSE CONNECTION
=========================================
*/

$conn->close();

?>