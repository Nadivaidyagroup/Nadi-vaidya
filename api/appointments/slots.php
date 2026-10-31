<?php
/*
GET /api/appointments/slots.php?clinic=karnal&date=2026-11-03
उस दिन के सारे slot, हर एक के साथ available true/false
*/

require_once __DIR__ . "/_common.php";

requireGetMethod();
apptEnsureTable($conn);

$clinic = trim($_GET["clinic"] ?? "");
$date = trim($_GET["date"] ?? "");

if (!isset($APPT_CLINICS[$clinic])) {
    http_response_code(400);
    sendJsonResponse(false, "Invalid clinic");
}

if (!apptValidDate($date)) {
    http_response_code(400);
    sendJsonResponse(false, "Invalid date");
}

if (!apptClinicOpenOn($clinic, $date)) {
    sendJsonResponse(true, "Clinic closed on this date", [
        "open" => false,
        "slots" => [],
    ]);
}

$stmt = apptPrepare($conn, 
    "SELECT appt_time FROM appointments
     WHERE clinic = ? AND appt_date = ? AND active = 1"
);
$stmt->bind_param("ss", $clinic, $date);
$stmt->execute();
$booked = [];
foreach (apptFetchAll($stmt) as $row) {
    $booked[$row["appt_time"]] = true;
}

$slots = [];
foreach (apptAllSlots() as $t) {
    $slots[] = [
        "time" => $t,
        "label" => apptLabel($t),
        "available" => !isset($booked[$t]) && apptSlotNotPast($date, $t),
    ];
}

sendJsonResponse(true, "OK", [
    "open" => true,
    "slots" => $slots,
]);
?>
