<?php
/*
POST /api/appointments/book.php
JSON: clinic, date, time, name, phone, age, gender, city, problem, website(खाली — spam जाल)
*/

require_once __DIR__ . "/_common.php";

requirePostMethod();
apptEnsureTable($conn);

$data = getJsonInput() ?: [];

/* spam bots यह छुपा field भर देते हैं */
if (!empty($data["website"])) {
    sendJsonResponse(true, "OK", ["id" => 0]);
}

$clinic  = trim($data["clinic"] ?? "");
$date    = trim($data["date"] ?? "");
$time    = trim($data["time"] ?? "");
$name    = trim($data["name"] ?? "");
$phone   = apptCleanPhone($data["phone"] ?? "");
$age     = trim($data["age"] ?? "");
$gender  = trim($data["gender"] ?? "");
$city    = trim($data["city"] ?? "");
$problem = trim($data["problem"] ?? "");

if (!isset($APPT_CLINICS[$clinic])) {
    http_response_code(400);
    sendJsonResponse(false, "कृपया क्लीनिक चुनें।");
}
if (!apptValidDate($date) || !apptClinicOpenOn($clinic, $date)) {
    http_response_code(400);
    sendJsonResponse(false, "यह तारीख़ उपलब्ध नहीं है।");
}
if (!in_array($time, apptAllSlots(), true) || !apptSlotNotPast($date, $time)) {
    http_response_code(400);
    sendJsonResponse(false, "यह समय उपलब्ध नहीं है, कृपया दूसरा समय चुनें।");
}
if (mb_strlen($name) < 2 || mb_strlen($name) > 120) {
    http_response_code(400);
    sendJsonResponse(false, "कृपया अपना पूरा नाम लिखें।");
}
if ($phone === "") {
    http_response_code(400);
    sendJsonResponse(false, "कृपया सही 10 अंकों का मोबाइल नंबर लिखें।");
}
if ($age !== "" && (!ctype_digit($age) || (int) $age < 0 || (int) $age > 120)) {
    http_response_code(400);
    sendJsonResponse(false, "कृपया सही उम्र लिखें।");
}
if (!in_array($gender, ["", "male", "female", "other"], true)) {
    $gender = "";
}
$city = mb_substr($city, 0, 80);
$problem = mb_substr($problem, 0, 1000);

/* एक नंबर से बहुत ज़्यादा आगे की बुकिंग नहीं */
$stmt = apptPrepare($conn, 
    "SELECT COUNT(*) AS c FROM appointments
     WHERE phone = ? AND active = 1 AND appt_date >= CURDATE()"
);
$stmt->bind_param("s", $phone);
$stmt->execute();
$found = apptFetchAll($stmt);
$count = (int) ($found[0]["c"] ?? 0);
if ($count >= APPT_MAX_ACTIVE_PER_PHONE) {
    http_response_code(409);
    sendJsonResponse(false, "इस नंबर से पहले से अपॉइंटमेंट बुक है। बदलाव के लिए क्लीनिक पर कॉल करें।");
}

$stmt = apptPrepare($conn, 
    "INSERT INTO appointments
        (clinic, appt_date, appt_time, name, phone, age, gender, city, problem)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
);
$ageVal = $age === "" ? null : $age;
$genderVal = $gender === "" ? null : $gender;
$cityVal = $city === "" ? null : $city;
$problemVal = $problem === "" ? null : $problem;
$stmt->bind_param(
    "sssssssss",
    $clinic, $date, $time, $name, $phone,
    $ageVal, $genderVal, $cityVal, $problemVal
);

if (!$stmt->execute()) {
    if ($conn->errno === 1062) {
        http_response_code(409);
        sendJsonResponse(false, "यह समय अभी-अभी किसी और ने बुक कर लिया। कृपया दूसरा समय चुनें।");
    }
    http_response_code(500);
    sendJsonResponse(false, "Server error, कृपया दोबारा कोशिश करें।");
}

sendJsonResponse(true, "Appointment booked", [
    "id" => $stmt->insert_id,
    "clinic" => $clinic,
    "clinicName" => $APPT_CLINICS[$clinic]["name"],
    "clinicPhone" => $APPT_CLINICS[$clinic]["phone"],
    "date" => $date,
    "time" => $time,
    "timeLabel" => apptLabel($time),
]);
?>
