<?php

/*
=========================================
COMMON SECURITY FILE
FILE:
security.php
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
ALLOW ORIGIN
=========================================
*/

$allowedOrigins = [

    "http://localhost:5173",

    "http://localhost",

    "http://localhost/nadivaidya.in",

    "https://nadivaidya.in",

    "https://www.nadivaidya.in",

    "https://joinus.co.in",

    "https://www.joinus.co.in"

];

/*
=========================================
CHECK REQUEST ORIGIN
=========================================
*/

if (isset($_SERVER["HTTP_ORIGIN"])) {

    $origin =
        $_SERVER["HTTP_ORIGIN"];

    if (

        in_array(
            $origin,
            $allowedOrigins
        )

    ) {

        header(
            "Access-Control-Allow-Origin: $origin"
        );

    }

}

/*
=========================================
CORS HEADERS
=========================================
*/

header(
    "Access-Control-Allow-Credentials: true"
);

header(
    "Access-Control-Allow-Headers: Content-Type, Authorization"
);

header(
    "Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"
);

/*
=========================================
HANDLE OPTIONS
=========================================
*/

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {

    http_response_code(200);

    exit();

}

/*
=========================================
SECURE SESSION SETTINGS
=========================================
*/

ini_set(
    "session.cookie_httponly",
    1
);

ini_set(
    "session.use_only_cookies",
    1
);

ini_set(
    "session.cookie_samesite",
    "Lax"
);

/*
=========================================
HTTPS COOKIE
=========================================
*/

if (!empty($_SERVER["HTTPS"])) {

    ini_set(
        "session.cookie_secure",
        1
    );

}

/*
=========================================
START SESSION
=========================================
*/

if (

    session_status() ===
    PHP_SESSION_NONE

) {

    session_start();

}

/*
=========================================
REQUIRE ADMIN LOGIN
=========================================
*/

function requireAdminLogin() {

    if (

        !isset($_SESSION["admin_logged_in"]) ||

        $_SESSION["admin_logged_in"] !== true ||

        !isset($_SESSION["admin_id"])

    ) {

        http_response_code(401);

        echo json_encode([

            "success" => false,

            "message" =>
                "Unauthorized Access"

        ]);

        exit();

    }

}

/*
=========================================
ONLY POST METHOD
=========================================
*/

function requirePostMethod() {

    if (

        $_SERVER["REQUEST_METHOD"] !==
        "POST"

    ) {

        http_response_code(405);

        echo json_encode([

            "success" => false,

            "message" =>
                "Only POST Method Allowed"

        ]);

        exit();

    }

}

/*
=========================================
ONLY GET METHOD
=========================================
*/

function requireGetMethod() {

    if (

        $_SERVER["REQUEST_METHOD"] !==
        "GET"

    ) {

        http_response_code(405);

        echo json_encode([

            "success" => false,

            "message" =>
                "Only GET Method Allowed"

        ]);

        exit();

    }

}

/*
=========================================
GET JSON INPUT
=========================================
*/

function getJsonInput() {

    $json =
        file_get_contents("php://input");

    return json_decode(
        $json,
        true
    );

}

/*
=========================================
SEND JSON RESPONSE
=========================================
*/

function sendJsonResponse(

    $success,
    $message,
    $data = []

) {

    echo json_encode(

        array_merge(

            [

                "success" => $success,

                "message" => $message

            ],

            $data

        )

    );

    exit();

}

?>