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

// Manage preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Configuration
$dataFile = __DIR__ . '/../data/concerts.json';
$password = 'chamale2026'; // ¡Cambie esto por su contraseña deseada!

// Make sure the data directory exists
$dataDir = dirname($dataFile);
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}

// Default concert data
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

// Initializing the data file; otherwise it doesn't exist
if (!file_exists($dataFile)) {
    file_put_contents($dataFile, json_encode($defaultConcerts, JSON_PRETTY_PRINT));
}

// ---------- Helper function to validate concert data ----------
function validateConcertData($concerts)
{
    $errors = [];

    if (!is_array($concerts)) {
        return ['valid' => false, 'errors' => ['Los datos deben ser un arreglo']];
    }

    foreach ($concerts as $index => $concert) {
        // Validate 'day' field
        if (!isset($concert['day']) || !is_string($concert['day'])) {
            $errors[] = "Concierto #" . ($index + 1) . ": El campo 'día' es requerido";
            continue;
        }

        $day = trim($concert['day']);

        // Check if empty
        if (empty($day)) {
            $errors[] = "Concierto #" . ($index + 1) . ": El campo 'día' no puede estar vacío";
            continue;
        }

        // Check if contains only numbers (1 or 2 digits)
        if (!preg_match('/^\d{1,2}$/', $day)) {
            $errors[] = "Concierto #" . ($index + 1) . ": El día debe ser un número de 1 o 2 dígitos (1-31)";
            continue;
        }

        // Check if day is between 1 and 31
        $dayNum = intval($day);
        if ($dayNum < 1 || $dayNum > 31) {
            $errors[] = "Concierto #" . ($index + 1) . ": El día debe estar entre 1 y 31";
            continue;
        }

        // Validate 'month' field
        if (!isset($concert['month']) || !is_string($concert['month'])) {
            $errors[] = "Concierto #" . ($index + 1) . ": El campo 'mes' es requerido";
            continue;
        }

        $month = trim($concert['month']);

        // Check if empty
        if (empty($month)) {
            $errors[] = "Concierto #" . ($index + 1) . ": El campo 'mes' no puede estar vacío";
            continue;
        }

        // Check if month is 1-4 characters (allow 3 for Spanish months like "ene", "feb", etc.)
        // Also allow full month names in Russian and Spanish
        if (strlen($month) > 4) {
            $errors[] = "Concierto #" . ($index + 1) . ": El mes debe tener máximo 4 caracteres (ej. 'ene', 'feb', 'mar')";
            continue;
        }

        // Optional: Check if month contains only letters (no numbers or special chars)
        if (!preg_match('/^[a-zA-Zа-яА-Я]{1,4}$/u', $month)) {
            $errors[] = "Concierto #" . ($index + 1) . ": El mes debe contener solo letras";
            continue;
        }

        // Validate 'title' field
        if (!isset($concert['title']) || !is_string($concert['title'])) {
            $errors[] = "Concierto #" . ($index + 1) . ": El campo 'título' es requerido";
            continue;
        }

        $title = trim($concert['title']);
        if (empty($title)) {
            $errors[] = "Concierto #" . ($index + 1) . ": El campo 'título' no puede estar vacío";
            continue;
        }

        // Validate 'venue' field
        if (!isset($concert['venue']) || !is_string($concert['venue'])) {
            $errors[] = "Concierto #" . ($index + 1) . ": El campo 'lugar' es requerido";
            continue;
        }

        $venue = trim($concert['venue']);
        if (empty($venue)) {
            $errors[] = "Concierto #" . ($index + 1) . ": El campo 'lugar' no puede estar vacío";
            continue;
        }

        // Validate 'city' field
        if (!isset($concert['city']) || !is_string($concert['city'])) {
            $errors[] = "Concierto #" . ($index + 1) . ": El campo 'ciudad' es requerido";
            continue;
        }

        $city = trim($concert['city']);
        if (empty($city)) {
            $errors[] = "Concierto #" . ($index + 1) . ": El campo 'ciudad' no puede estar vacío";
            continue;
        }

        // Validate 'time' field
        if (!isset($concert['time']) || !is_string($concert['time'])) {
            $errors[] = "Concierto #" . ($index + 1) . ": El campo 'hora' es requerido";
            continue;
        }

        $time = trim($concert['time']);
        if (empty($time)) {
            $errors[] = "Concierto #" . ($index + 1) . ": El campo 'hora' no puede estar vacío";
            continue;
        }
    }

    return [
        'valid' => empty($errors),
        'errors' => $errors
    ];
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

    // Verify authentication action
    if (isset($input['action']) && $input['action'] === 'verify') {
        $auth = isset($input['password']) && $input['password'] === $password;
        echo json_encode(['authenticated' => $auth]);
        exit;
    }

    // Validate password
    if (!isset($input['password']) || $input['password'] !== $password) {
        http_response_code(401);
        echo json_encode(['error' => 'No autorizado: Contraseña incorrecta']);
        exit;
    }

    // Validate concert data
    if (!isset($input['concerts']) || !is_array($input['concerts'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Formato de datos inválido: se esperaba un arreglo de conciertos']);
        exit;
    }

    // Validate each concert's fields
    $validationResult = validateConcertData($input['concerts']);

    if (!$validationResult['valid']) {
        http_response_code(400);
        echo json_encode([
            'error' => 'Datos de conciertos inválidos',
            'details' => $validationResult['errors']
        ]);
        exit;
    }

    // Save data
    $result = file_put_contents($dataFile, json_encode($input['concerts'], JSON_PRETTY_PRINT));

    if ($result === false) {
        http_response_code(500);
        echo json_encode(['error' => 'Error al guardar los datos de conciertos']);
        exit;
    }

    echo json_encode(['success' => true, 'message' => 'Conciertos actualizados correctamente']);
    exit;
}

// If we are here, method is not allowed
http_response_code(405);
echo json_encode(['error' => 'Método no permitido']);
