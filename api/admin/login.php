<?php

/*
=========================================
SECURE ADMIN LOGIN API
FILE:
login.php
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
ONLY POST METHOD
=========================================
*/

requirePostMethod();

/*
=========================================
GET JSON DATA
=========================================
*/

$data = getJsonInput();

/*
=========================================
GET FORM DATA
=========================================
*/

$email =
    trim($data["email"] ?? "");

$password =
    trim($data["password"] ?? "");

/*
=========================================
VALIDATION
=========================================
*/

if (

    empty($email) ||
    empty($password)

) {

    sendJsonResponse(
        false,
        "Email and Password required"
    );

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

    sendJsonResponse(
        false,
        "Invalid Email Address"
    );

}

/*
=========================================
CHECK ADMIN
=========================================
*/

$stmt = $conn->prepare(

    "SELECT
        id,
        name,
        email,
        password
     FROM admins
     WHERE email = ?
     LIMIT 1"

);

if (!$stmt) {

    http_response_code(500);

    sendJsonResponse(
        false,
        "Database Error"
    );

}

$stmt->bind_param(
    "s",
    $email
);

$stmt->execute();

$result =
    $stmt->get_result();

/*
=========================================
USER NOT FOUND
=========================================
*/

if (

    $result->num_rows === 0

) {

    http_response_code(401);

    sendJsonResponse(
        false,
        "Invalid Email or Password"
    );

}

/*
=========================================
GET USER
=========================================
*/

$user =
    $result->fetch_assoc();

/*
=========================================
VERIFY PASSWORD
=========================================
*/

if (

    !password_verify(
        $password,
        $user["password"]
    )

) {

    http_response_code(401);

    sendJsonResponse(
        false,
        "Invalid Email or Password"
    );

}

/*
=========================================
REGENERATE SESSION
=========================================
*/

session_regenerate_id(true);

/*
=========================================
CREATE SESSION
=========================================
*/

$_SESSION["admin_logged_in"] =
    true;

$_SESSION["admin_id"] =
    $user["id"];

$_SESSION["admin_name"] =
    $user["name"];

$_SESSION["admin_email"] =
    $user["email"];

/*
=========================================
SUCCESS RESPONSE
=========================================
*/

sendJsonResponse(

    true,

    "Login Successful",

    [

        "user" => [

            "id" =>
                $user["id"],

            "name" =>
                $user["name"],

            "email" =>
                $user["email"]

        ]

    ]

);

/*
=========================================
CLOSE
=========================================
*/

$stmt->close();

$conn->close();

?>