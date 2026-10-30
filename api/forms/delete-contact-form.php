<?php

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
GET JSON DATA
=========================================
*/

$data = json_decode(

    file_get_contents("php://input"),

    true

);

/*
=========================================
GET FORM ID
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
            "Invalid Form ID"

    ]);

    exit();

}

/*
=========================================
CHECK FORM EXISTS
=========================================
*/

$checkStmt = $conn->prepare(

    "SELECT id FROM contact_forms
     WHERE id = ?
     LIMIT 1"

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
FORM NOT FOUND
=========================================
*/

if ($checkResult->num_rows === 0) {

    echo json_encode([

        "success" => false,

        "message" =>
            "Contact Form Not Found"

    ]);

    exit();

}

/*
=========================================
DELETE FORM
=========================================
*/

$deleteStmt = $conn->prepare(

    "DELETE FROM contact_forms
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
            "Contact Form Deleted Successfully"

    ]);

} else {

    echo json_encode([

        "success" => false,

        "message" =>
            "Failed To Delete Contact Form",

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