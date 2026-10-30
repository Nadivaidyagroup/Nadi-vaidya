<?php

/*
=========================================
DATABASE CONNECTION
FILE: db.php
=========================================
*/

/*
 Password अब code में नहीं लिखा जाता।
 वह server पर db.secret.php फ़ाइल में रहता है, जिसे
 GitHub का auto-deploy, GitHub Secret "DB_PASSWORD" से बनाता है।
 (db.secret.php कभी GitHub पर नहीं जाती — .gitignore में है)
*/

$host = "localhost";
$user = "nadivaidyanewwebsite";
$dbname = "nadivaidyanewwebsite";
$pass = "";

$secretFile = __DIR__ . "/db.secret.php";

if (file_exists($secretFile)) {
    $secret = require $secretFile;
    $pass = $secret["password"] ?? "";
    $user = $secret["user"] ?? $user;
    $dbname = $secret["dbname"] ?? $dbname;
}


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