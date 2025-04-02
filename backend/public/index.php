<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../src/config/db.php';
require_once __DIR__ . '/../src/config/jwt.php';
require_once __DIR__ . '/../src/middleware/AuthMiddleware.php';
require_once __DIR__ . '/../src/controllers/AuthController.php';
require_once __DIR__ . '/../src/controllers/TaskController.php';

header('Content-Type: application/json');

$request_uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$request_method = $_SERVER['REQUEST_METHOD'];

// Публичные маршруты (не требуют аутентификации)
if ($request_uri === '/api/register' && $request_method === 'POST') {
    AuthController::register();
    exit;
}

if ($request_uri === '/api/login' && $request_method === 'POST') {
    AuthController::login();
    exit;
}

// Защищенные маршруты (требуют JWT)
try {
    $user_id = AuthMiddleware::handle();
    
    switch ($request_uri) {
        case '/api/tasks':
            if ($request_method === 'GET') {
                TaskController::getTasks($user_id);
            } elseif ($request_method === 'POST') {
                TaskController::createTask($user_id);
            } else {
                http_response_code(405);
                echo json_encode(['error' => 'Method not allowed']);
            }
            break;
            
        default:
            http_response_code(404);
            echo json_encode(['error' => 'Not found']);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
