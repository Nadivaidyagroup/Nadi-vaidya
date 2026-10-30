<?php

header("Content-Type: application/json");

/*
=========================================
DATABASE
=========================================
*/

include "../config/db.php";

/*
=========================================
ONLY POST
=========================================
*/

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

  echo json_encode([

    "success" => false,

    "message" =>
      "Invalid Request"

  ]);

  exit;

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
VALUES
=========================================
*/

$name =
  mysqli_real_escape_string(
    $conn,
    $data["full_name"] ?? ""
  );

$gender =
  mysqli_real_escape_string(
    $conn,
    $data["gender"] ?? ""
  );

$age =
  mysqli_real_escape_string(
    $conn,
    $data["age"] ?? ""
  );

$education =
  mysqli_real_escape_string(
    $conn,
    $data["education"] ?? ""
  );

$phone =
  mysqli_real_escape_string(
    $conn,
    $data["phone"] ?? ""
  );

$whatsapp =
  mysqli_real_escape_string(
    $conn,
    $data["whatsapp"] ?? ""
  );

$email =
  mysqli_real_escape_string(
    $conn,
    $data["email"] ?? ""
  );

$country =
  mysqli_real_escape_string(
    $conn,
    $data["country"] ?? ""
  );

$city =
  mysqli_real_escape_string(
    $conn,
    $data["city"] ?? ""
  );

$state =
  mysqli_real_escape_string(
    $conn,
    $data["state"] ?? ""
  );

$address =
  mysqli_real_escape_string(
    $conn,
    $data["address"] ?? ""
  );

$message =
  mysqli_real_escape_string(
    $conn,
    $data["message"] ?? ""
  );

/*
=========================================
VALIDATION
=========================================
*/

if (
  empty($name) ||
  empty($phone)
) {

  echo json_encode([

    "success" => false,

    "message" =>
      "Name and Phone are required"

  ]);

  exit;

}

/*
=========================================
INSERT QUERY
=========================================
*/

$sql = "

INSERT INTO nadi_forms (

  name,
  gender,
  age,
  education,
  phone,
  whatsapp,
  email,
  country,
  city,
  state,
  address,
  message

)

VALUES (

  '$name',
  '$gender',
  '$age',
  '$education',
  '$phone',
  '$whatsapp',
  '$email',
  '$country',
  '$city',
  '$state',
  '$address',
  '$message'

)

";

/*
=========================================
RUN QUERY
=========================================
*/

$query = mysqli_query(
  $conn,
  $sql
);

/*
=========================================
RESPONSE
=========================================
*/

if ($query) {

  echo json_encode([

    "success" => true,

    "message" =>
      "Form Submitted Successfully"

  ]);

} else {

  echo json_encode([

    "success" => false,

    "message" =>
      mysqli_error($conn)

  ]);

}

?>