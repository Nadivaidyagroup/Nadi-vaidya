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
ONLY GET REQUEST
=========================================
*/

if ($_SERVER["REQUEST_METHOD"] !== "GET") {

    echo json_encode([

        "success" => false,

        "message" =>
            "Invalid Request Method"

    ]);

    exit();

}

/*
=========================================
GET NADI FORMS
=========================================
*/

$sql = "

SELECT *

FROM nadi_forms

ORDER BY id DESC

";

/*
=========================================
RUN QUERY
=========================================
*/

$result = $conn->query($sql);

/*
=========================================
STORE DATA
=========================================
*/

$forms = [];

/*
=========================================
FETCH ROWS
=========================================
*/

if (

    $result &&
    $result->num_rows > 0

) {

    while (

        $row =
            $result->fetch_assoc()

    ) {

        $forms[] = [

            "id" =>
                $row["id"],

            "name" =>
                $row["name"],

            "gender" =>
                $row["gender"],

            "age" =>
                $row["age"],

            "education" =>
                $row["education"],

            "phone" =>
                $row["phone"],

            "whatsapp" =>
                $row["whatsapp"],

            "email" =>
                $row["email"],

            "country" =>
                $row["country"],

            "city" =>
                $row["city"],

            "state" =>
                $row["state"],

            "address" =>
                $row["address"],

            "message" =>
                $row["message"],

            "created_at" =>
                $row["created_at"]

        ];

    }

}

/*
=========================================
RETURN JSON
=========================================
*/

echo json_encode(

    $forms,

    JSON_UNESCAPED_UNICODE |
    JSON_UNESCAPED_SLASHES

);

/*
=========================================
CLOSE DB
=========================================
*/

$conn->close();

?>