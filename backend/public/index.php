<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *'); // permite que el frontend haga fetch desde otro puerto

$aulas = [
    ["id" => 1, "nombre" => "Aula de Informática 1", "capacidad" => 30],
    ["id" => 2, "nombre" => "Aula de Informática 2", "capacidad" => 25],
    ["id" => 3, "nombre" => "Biblioteca", "capacidad" => 40],
];

echo json_encode($aulas, JSON_UNESCAPED_UNICODE);