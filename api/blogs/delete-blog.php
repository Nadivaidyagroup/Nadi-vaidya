<?php

/*
=========================================
DELETE BLOG API
FILE:
delete-blog.php
=========================================
*/

/*
=========================================
DB CONNECTION
=========================================
*/


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

        "message" =>
            "Invalid Request Method"

    ]);

    exit();

}

/*
=========================================
GET JSON INPUT
=========================================
*/

$data = json_decode(

    file_get_contents("php://input"),

    true

);

/*
=========================================
GET BLOG ID
=========================================
*/

$id = intval(
    $data["id"] ?? 0
);

/*
=========================================
VALIDATE ID
=========================================
*/

if ($id <= 0) {

    echo json_encode([

        "success" => false,

        "message" =>
            "Invalid Blog ID"

    ]);

    exit();

}

/*
=========================================
CHECK BLOG EXISTS
=========================================
*/

$checkStmt = $conn->prepare(

    "SELECT id FROM blogs
     WHERE id = ? LIMIT 1"

);

$checkStmt->bind_param(
    "i",
    $id
);

$checkStmt->execute();

$checkResult =
    $checkStmt->get_result();

/*
=========================================
BLOG NOT FOUND
=========================================
*/

if ($checkResult->num_rows === 0) {

    echo json_encode([

        "success" => false,

        "message" =>
            "Blog Not Found"

    ]);

    exit();

}

/*
=========================================
DELETE BLOG
=========================================
*/

$deleteStmt = $conn->prepare(

    "DELETE FROM blogs
     WHERE id = ?"

);

$deleteStmt->bind_param(
    "i",
    $id
);

/*
=========================================
EXECUTE DELETE
=========================================
*/

if ($deleteStmt->execute()) {

    echo json_encode([

        "success" => true,

        "message" =>
            "Blog Deleted Successfully"

    ]);

} else {

    echo json_encode([

        "success" => false,

        "message" =>
            "Failed To Delete Blog",

        "error" =>
            $deleteStmt->error

    ]);

}

/*
=========================================
CLOSE
=========================================
*/

$checkStmt->close();

$deleteStmt->close();

$conn->close();

?>