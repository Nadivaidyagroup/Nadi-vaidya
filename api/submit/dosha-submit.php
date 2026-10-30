<?php

/*
=========================================
DOSHA QUIZ SUBMIT API
FILE:
dosha-submit.php
=========================================
*/

/*
=========================================
JSON HEADER
=========================================
*/

header("Content-Type: application/json");

/*
=========================================
DB CONNECTION
=========================================
*/

require_once "../config/db.php";

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
GET FORM DATA
=========================================
*/

$name =
    trim($data["name"] ?? "");

$email =
    trim($data["email"] ?? "");

$phone =
    trim($data["phone"] ?? "");

$result =
    trim($data["result"] ?? "");

/*
=========================================
VALIDATION
=========================================
*/

if (

    empty($name) ||
    empty($email) ||
    empty($phone) ||
    empty($result)

) {

    echo json_encode([

        "success" => false,

        "message" =>
            "All fields are required"

    ]);

    exit();

}

/*
=========================================
VALID EMAIL
=========================================
*/

if (

    !filter_var(
        $email,
        FILTER_VALIDATE_EMAIL
    )

) {

    echo json_encode([

        "success" => false,

        "message" =>
            "Invalid Email Address"

    ]);

    exit();

}

/*
=========================================
INSERT DATA
=========================================
*/

$stmt = $conn->prepare(

    "INSERT INTO dosha_forms (

        name,
        email,
        phone,
        result

    )

    VALUES (?, ?, ?, ?)"

);

/*
=========================================
CHECK PREPARE
=========================================
*/

if (!$stmt) {

    echo json_encode([

        "success" => false,

        "message" =>
            "Prepare Failed",

        "error" =>
            $conn->error

    ]);

    exit();

}

/*
=========================================
BIND
=========================================
*/

$stmt->bind_param(

    "ssss",

    $name,
    $email,
    $phone,
    $result

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
            "Dosha Quiz Submitted Successfully"

    ]);

} else {

    echo json_encode([

        "success" => false,

        "message" =>
            "Failed To Submit Dosha Quiz",

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

$conn->close();

?>