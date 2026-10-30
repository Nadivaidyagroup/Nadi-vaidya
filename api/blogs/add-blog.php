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
GET METHOD
=========================================
*/
requireAdminLogin();

/*
=========================================
ONLY POST
=========================================
*/

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    echo json_encode([

        "success" => false,
        "message" => "Invalid Request"

    ]);

    exit();

}

/*
=========================================
UPLOAD IMAGE
=========================================
*/

$imagePath = "";

if (isset($_FILES["image"])) {

    $imageName =
        time() . "_" .
        basename($_FILES["image"]["name"]);

    $targetDir =
        "../../uploads/";

    /*
    CREATE FOLDER
    */

    if (!file_exists($targetDir)) {

        mkdir(
            $targetDir,
            0777,
            true
        );

    }

    $targetFile =
        $targetDir . $imageName;

    /*
    MOVE IMAGE
    */

    if (

        move_uploaded_file(

            $_FILES["image"]["tmp_name"],

            $targetFile

        )

    ) {

        $imagePath =
            "/uploads/" . $imageName;

    }

}

/*
=========================================
FORM DATA
=========================================
*/

$title =
    trim($_POST["title"] ?? "");

$slug =
    trim($_POST["slug"] ?? "");

$category =
    trim($_POST["category"] ?? "");

$author =
    trim($_POST["author"] ?? "");

$excerpt =
    trim($_POST["excerpt"] ?? "");

$content =
    trim($_POST["content"] ?? "");

/*
=========================================
VALIDATION
=========================================
*/

if (

    empty($title) ||
    empty($slug)

) {

    echo json_encode([

        "success" => false,
        "message" => "Title and slug required"

    ]);

    exit();

}

/*
=========================================
INSERT BLOG
=========================================
*/

$stmt = $conn->prepare(

    "INSERT INTO blogs
    (
        title,
        slug,
        category,
        author,
        image,
        excerpt,
        content
    )

    VALUES (?, ?, ?, ?, ?, ?, ?)"

);

$stmt->bind_param(

    "sssssss",

    $title,
    $slug,
    $category,
    $author,
    $imagePath,
    $excerpt,
    $content

);

/*
=========================================
EXECUTE
=========================================
*/

if ($stmt->execute()) {

    echo json_encode([

        "success" => true,
        "message" => "Blog Added"

    ]);

} else {

    echo json_encode([

        "success" => false,
        "message" => $stmt->error

    ]);

}

$stmt->close();

$conn->close();

?>