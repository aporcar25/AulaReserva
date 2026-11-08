<?php
// Todo lo que devolvemos es JSON
header("Content-Type: application/json; charset=utf-8");

// Permisos para que el frontend (puerto 5500) pueda llamar al backend (puerto 8000)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

// El navegador hace una comprobación antes del POST (petición OPTIONS)
if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    http_response_code(204);
    exit;
}

// Solo aceptamos POST
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    http_response_code(405);
    echo json_encode(["mensaje" => "Usa el método POST"], JSON_UNESCAPED_UNICODE);
    exit;
}

// Leemos el JSON que nos envía el frontend
$json = file_get_contents("php://input");
$datos = json_decode($json, true);

// Guardamos cada dato en una variable (si no existe, queda vacío)
$aula = $datos["aula"] ?? ""
$fecha = $datos["fecha"] ?? "";
$hora = $datos["hora"] ?? "";
$responsable = trim($datos["responsable"] ?? "");

// Si falta algún dato, error 400
if ($aula == "" || $fecha == "" || $hora == "" || $responsable == "") {
    http_response_code(400);
    echo json_encode(["mensaje" => "Faltan datos de la reserva"], JSON_UNESCAPED_UNICODE);
    exit;
}

// Si todo está bien, 201 Created
http_response_code(201);
echo json_encode(["mensaje" => "Reserva recibida correctamente"], JSON_UNESCAPED_UNICODE);