<?php
/*
POST /api/appointments/admin-update.php   JSON: { id, status }
status: booked | visited | no_show | cancelled
cancelled करने पर वह slot दोबारा खुल जाता है।
*/

require_once __DIR__ . "/_common.php";

requireAdminLogin();
requirePostMethod();
apptEnsureTable($conn);

$data = getJsonInput() ?: [];
$id = (int) ($data["id"] ?? 0);
$status = trim($data["status"] ?? "");

if ($id <= 0 || !in_array($status, ["booked", "visited", "no_show", "cancelled"], true)) {
    http_response_code(400);
    sendJsonResponse(false, "Invalid request");
}

if ($status === "cancelled") {
    $stmt = apptPrepare($conn, "UPDATE appointments SET status = ?, active = NULL WHERE id = ?");
    $stmt->bind_param("si", $status, $id);
} else {
    /* cancelled से वापस लाने पर slot फिर से रोकें */
    $stmt = apptPrepare($conn, "UPDATE appointments SET status = ?, active = 1 WHERE id = ?");
    $stmt->bind_param("si", $status, $id);
}

if (!$stmt->execute()) {
    if ($conn->errno === 1062) {
        http_response_code(409);
        sendJsonResponse(false, "यह slot अब किसी और मरीज़ को मिल चुका है।");
    }
    http_response_code(500);
    sendJsonResponse(false, "Database Error");
}

sendJsonResponse(true, "Updated");
?>
