<?php

header("Content-Type: application/json");

/*
=========================================
DB CONNECTION
=========================================
*/

require_once "../config/db.php";

/*
=========================================
ONLY POST
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
FORM VALUES
=========================================
*/

$name =
    trim($data["name"] ?? "");

$email =
    trim($data["email"] ?? "");

$phone =
    trim($data["phone"] ?? "");

$message =
    trim($data["message"] ?? "");

/*
=========================================
VALIDATION
=========================================
*/

if (

    empty($name) ||
    empty($email) ||
    empty($message)

) {

    echo json_encode([

        "success" => false,

        "message" =>
            "Name, Email and Message are required"

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
INSERT QUERY
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

        "message" =>
            "Contact Form Submitted Successfully"

    ]);

} else {

    echo json_encode([

        "success" => false,

        "message" =>
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