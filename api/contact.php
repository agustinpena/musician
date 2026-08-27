<?php

/**
 * Contact form email handler - Simple version
 * Just sends the form data to the client's email
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get the JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
    exit;
}

// Sanitize and validate input
$name = isset($input['name']) ? trim(strip_tags($input['name'])) : '';
$email = isset($input['email']) ? trim(filter_var($input['email'], FILTER_SANITIZE_EMAIL)) : '';
$message = isset($input['message']) ? trim(strip_tags($input['message'])) : '';

// Validate required fields
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Пожалуйста, заполните все поля.']);
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Пожалуйста, введите действительный адрес электронной почты.']);
    exit;
}

// ---------- Send email using PHP's mail() function ----------

$to = 'j.agustin.pena.a@gmail.com';  // Client's email
$subject = 'Nuevo mensaje desde su sitio web | Roberto Chamalé';

// Build the email body
$body = "Новое сообщение с контактной формы сайта:\n\n";
$body .= "Имя: $name\n";
$body .= "Email: $email\n";
$body .= "Сообщение:\n$message\n\n";
$body .= "---\n";
$body .= "Отправлено с сайта Роберто Чамале";

// Email headers
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";

// Send the email
$mailSent = mail($to, $subject, $body, $headers);

if ($mailSent) {
    echo json_encode(['success' => true, 'message' => '✓ Благодарю, ваше сообщение отправлено. Я отвечу в течение 48 часов.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Извините, произошла ошибка при отправке. Пожалуйста, попробуйте позже или напишите напрямую на почту.']);
}
