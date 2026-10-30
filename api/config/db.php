<?php

/*
=========================================
DATABASE CONNECTION
FILE: db.php
=========================================
*/

$host = "localhost";
$user = "nadivaidyanewwebsite";
$pass = "qaM)*4B#_63?V=MI";
$dbname = "nadivaidyanewwebsite";


/*
=========================================
CREATE CONNECTION
=========================================
*/

$conn = mysqli_connect(
    $host,
    $user,
    $pass,
    $dbname
);


/*
=========================================
CHECK CONNECTION
=========================================
*/

if (!$conn) {

    http_response_code(500);

    header("Content-Type: application/json");

    echo json_encode([
        "success" => false,
        "message" => "Database Connection Failed",
        "error" => mysqli_connect_error()
    ]);

    exit;
}


/*
=========================================
UTF-8 SUPPORT
=========================================
*/

if (!mysqli_set_charset($conn, "utf8mb4")) {

    http_response_code(500);

    header("Content-Type: application/json");

    echo json_encode([
        "success" => false,
        "message" => "Failed to set database charset",
        "error" => mysqli_error($conn)
    ]);

    exit;
}

?>