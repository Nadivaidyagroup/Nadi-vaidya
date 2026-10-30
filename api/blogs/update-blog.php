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
ONLY POST REQUEST
=========================================
*/

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    echo json_encode([

        "success" => false,

        "message" => "Invalid Request Method"

    ]);

    exit();

}

/*
=========================================
GET JSON DATA
=========================================
*/

$data = json_decode(

    file_get_contents("php://input"),

    true

);

/*
=========================================
FORM DATA
=========================================
*/

$id =
    intval($data["id"] ?? 0);

$title =
    trim($data["title"] ?? "");

$slug =
    trim($data["slug"] ?? "");

$category =
    trim($data["category"] ?? "");

$author =
    trim($data["author"] ?? "");

$image =
    trim($data["image"] ?? "");

$excerpt =
    trim($data["excerpt"] ?? "");

$content =
    trim($data["content"] ?? "");

/*
=========================================
VALIDATION
=========================================
*/

if (

    $id <= 0 ||
    empty($title) ||
    empty($slug) ||
    empty($content)

) {

    echo json_encode([

        "success" => false,

        "message" =>
            "Title, Slug and Content are required"

    ]);

    exit();

}

/*
=========================================
CHECK BLOG EXISTS
=========================================
*/

$checkStmt = $conn->prepare(

    "SELECT id
     FROM blogs
     WHERE id = ?"

);

$checkStmt->bind_param(
    "i",
    $id
);

$checkStmt->execute();

$checkResult =
    $checkStmt->get_result();

if ($checkResult->num_rows === 0) {

    echo json_encode([

        "success" => false,

        "message" => "Blog Not Found"

    ]);

    exit();

}

/*
=========================================
UPDATE BLOG
=========================================
*/

$stmt = $conn->prepare(

    "UPDATE blogs SET

        title = ?,
        slug = ?,
        category = ?,
        author = ?,
        image = ?,
        excerpt = ?,
        content = ?

    WHERE id = ?"

);

/*
=========================================
BIND PARAMS
=========================================
*/

$stmt->bind_param(

    "sssssssi",

    $title,
    $slug,
    $category,
    $author,
    $image,
    $excerpt,
    $content,
    $id

);

/*
=========================================
EXECUTE
=========================================
*/

if ($stmt->execute()) {

    echo json_encode([

        "success" => true,

        "message" =>
            "Blog Updated Successfully"

    ]);

} else {

    echo json_encode([

        "success" => false,

        "message" =>
            "Failed To Update Blog",

        "error" =>
            $stmt->error

    ]);

}

/*
=========================================
CLOSE
=========================================
*/

$stmt->close();

$checkStmt->close();

$conn->close();

?>