<?php

/*
=========================================
SECURE ADMIN REGISTER API
FILE:
register.php
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
GET JSON INPUT
=========================================
*/

$data = getJsonInput();

/*
=========================================
GET FORM DATA
=========================================
*/

$name =
    trim($data["name"] ?? "");

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

    empty($name) ||
    empty($email) ||
    empty($password)

) {

    sendJsonResponse(
        false,
        "All fields are required"
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
ONLY THIS EMAIL ALLOWED
=========================================
*/

$allowedAdminEmail =
    "nadivigyan@gmail.com";

if (

    strtolower($email) !==
    strtolower($allowedAdminEmail)

) {

    http_response_code(403);

    sendJsonResponse(
        false,
        "Only Authorized Admin Can Register"
    );

}

/*
=========================================
PASSWORD LENGTH
=========================================
*/

if (

    strlen($password) < 8

) {

    sendJsonResponse(
        false,
        "Password must be at least 8 characters"
    );

}

/*
=========================================
CHECK ADMIN EXISTS
=========================================
*/

$checkStmt = $conn->prepare(

    "SELECT id
     FROM admins
     WHERE email = ?
     LIMIT 1"

);

if (!$checkStmt) {

    http_response_code(500);

    sendJsonResponse(
        false,
        "Database Error"
    );

}

$checkStmt->bind_param(
    "s",
    $email
);

$checkStmt->execute();

$checkResult =
    $checkStmt->get_result();

/*
=========================================
ALREADY EXISTS
=========================================
*/

if (

    $checkResult->num_rows > 0

) {

    http_response_code(409);

    sendJsonResponse(
        false,
        "Admin already registered"
    );

}

/*
=========================================
HASH PASSWORD
=========================================
*/

$hashedPassword =
    password_hash(
        $password,
        PASSWORD_DEFAULT
    );

/*
=========================================
INSERT ADMIN
=========================================
*/

$stmt = $conn->prepare(

    "INSERT INTO admins (

        name,
        email,
        password

    )

    VALUES (?, ?, ?)"

);

if (!$stmt) {

    http_response_code(500);

    sendJsonResponse(
        false,
        "Database Error"
    );

}

$stmt->bind_param(

    "sss",

    $name,
    $email,
    $hashedPassword

);

/*
=========================================
EXECUTE
=========================================
*/

$inserted =
    $stmt->execute();

/*
=========================================
SUCCESS
=========================================
*/

if ($inserted) {

    $stmt->close();

    $checkStmt->close();

    $conn->close();

    sendJsonResponse(
        true,
        "Registration Successful"
    );

}

/*
=========================================
FAILED
=========================================
*/

http_response_code(500);

sendJsonResponse(
    false,
    "Registration Failed"
);

?>