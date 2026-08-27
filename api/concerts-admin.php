<?php

/**
 * API de administración para gestionar conciertos
 * Este archivo maneja:
 * - GET: Devuelve todos los conciertos
 * - POST: Actualiza los conciertos (requiere contraseña)
 * - POST con action=verify: Verifica la contraseña solamente
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Manejar solicitudes preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Configuración
$dataFile = __DIR__ . '/../data/concerts.json';
$password = 'chamale2026'; // ¡Cambie esto por su contraseña deseada!

// Asegurar que el directorio de datos existe
$dataDir = dirname($dataFile);
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}

// Datos de conciertos por defecto
$defaultConcerts = [
    [
        'day' => '18',
        'month' => 'ago',
        'title' => 'Nocturnos — Concierto solista',
        'venue' => 'Sala Nezahualcóyotl',
        'city' => 'Ciudad de México, MX',
        'time' => '20:00'
    ],
    [
        'day' => '14',
        'month' => 'sep',
        'title' => 'Recuerdos del sur — Presentación de álbum',
        'venue' => 'Teatro Colón',
        'city' => 'Buenos Aires, AR',
        'time' => '21:00'
    ],
    [
        'day' => '05',
        'month' => 'oct',
        'title' => 'Noche con Chopin',
        'venue' => 'Palacio de la Música',
        'city' => 'Barcelona, ES',
        'time' => '19:30'
    ]
];

// Initializing the data file if not it doesn't exist
if (!file_exists($dataFile)) {
    file_put_contents($dataFile, json_encode($defaultConcerts, JSON_PRETTY_PRINT));
}

// ---------- Handling GET requests ----------
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $data = file_get_contents($dataFile);
    $concerts = json_decode($data, true);

    if ($concerts === null) {
        $concerts = $defaultConcerts;
    }

    echo json_encode($concerts);
    exit;
}

// ---------- Handling POST requests ----------
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input) {
        http_response_code(400);
        echo json_encode(['error' => 'Entrada JSON inválida']);
        exit;
    }

    // Verificar acción de autenticación
    if (isset($input['action']) && $input['action'] === 'verify') {
        $auth = isset($input['password']) && $input['password'] === $password;
        echo json_encode(['authenticated' => $auth]);
        exit;
    }

    // Validar contraseña
    if (!isset($input['password']) || $input['password'] !== $password) {
        http_response_code(401);
        echo json_encode(['error' => 'No autorizado: Contraseña incorrecta']);
        exit;
    }

    // Validar datos de conciertos
    if (!isset($input['concerts']) || !is_array($input['concerts'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Formato de datos inválido: se esperaba un arreglo de conciertos']);
        exit;
    }

    // Guardar los datos
    $result = file_put_contents($dataFile, json_encode($input['concerts'], JSON_PRETTY_PRINT));

    if ($result === false) {
        http_response_code(500);
        echo json_encode(['error' => 'Error al guardar los datos de conciertos']);
        exit;
    }

    echo json_encode(['success' => true, 'message' => 'Conciertos actualizados correctamente']);
    exit;
}

// Si llegamos aquí, el método no está permitido
http_response_code(405);
echo json_encode(['error' => 'Método no permitido']);
