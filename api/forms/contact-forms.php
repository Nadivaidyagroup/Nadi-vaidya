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
$method = $_SERVER["REQUEST_METHOD"];

/*
=========================================
GET ALL CONTACT FORMS
=========================================
*/

if ($method === "GET") {

    $query = "
        SELECT *
        FROM contact_forms
        ORDER BY id DESC
    ";

    $result = $conn->query($query);

    /*
    =========================================
    QUERY ERROR
    =========================================
    */

    if (!$result) {

        echo json_encode([
            "success" => false,
            "message" => "Database Error"
        ]);

        exit;
    }

    /*
    =========================================
    STORE DATA
    =========================================
    */

    $forms = [];

    while ($row = $result->fetch_assoc()) {

        $forms[] = $row;
    }

    /*
    =========================================
    RESPONSE
    =========================================
    */

    echo json_encode([
        "success" => true,
        "count" => count($forms),
        "data" => $forms
    ]);

    $conn->close();

    exit;
}

/*
=========================================
ADD CONTACT FORM
POST METHOD
=========================================
*/

if ($method === "POST") {

    /*
    =========================================
    FORM DATA
    =========================================
    */

    $name = trim($_POST["name"] ?? "");
    $email = trim($_POST["email"] ?? "");
    $phone = trim($_POST["phone"] ?? "");
    $message = trim($_POST["message"] ?? "");

    /*
    =========================================
    VALIDATION
    =========================================
    */

    if (
        empty($name) ||
        empty($email) ||
        empty($phone) ||
        empty($message)
    ) {

        echo json_encode([
            "success" => false,
            "message" => "All fields are required"
        ]);

        exit;
    }

    /*
    =========================================
    INSERT DATA
    =========================================
    */

    $stmt = $conn->prepare(

        "INSERT INTO contact_forms (
            name,
            email,
            phone,
            message
        )

        VALUES (?, ?, ?, ?)"
    );

    /*
    =========================================
    DB ERROR
    =========================================
    */

    if (!$stmt) {

        echo json_encode([
            "success" => false,
            "message" => "Database Error"
        ]);

        exit;
    }

    /*
    =========================================
    BIND DATA
    =========================================
    */

    $stmt->bind_param(
        "ssss",
        $name,
        $email,
        $phone,
        $message
    );

    /*
    =========================================
    EXECUTE
    =========================================
    */

    if ($stmt->execute()) {

        echo json_encode([
            "success" => true,
            "message" => "Form Submitted Successfully"
        ]);

    } else {

        echo json_encode([
            "success" => false,
            "message" => $stmt->error
        ]);
    }

    /*
    =========================================
    CLOSE
    =========================================
    */

    $stmt->close();
    $conn->close();

    exit;
}

/*
=========================================
INVALID METHOD
=========================================
*/

echo json_encode([
    "success" => false,
    "message" => "Invalid Request Method"
]);

?>