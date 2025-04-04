<?php
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../src/config/db.php';
require_once __DIR__ . '/../src/config/jwt.php';
require_once __DIR__ . '/../src/middleware/AuthMiddleware.php';
require_once __DIR__ . '/../src/controllers/AuthController.php';
require_once __DIR__ . '/../src/controllers/TaskController.php';
require_once __DIR__ . '/../src/controllers/UserController.php';

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

    $pattern = '/\/api\/tasks\/([0-9]+)/'; 

    if (preg_match($pattern, $request_uri, $matches)) {

        $task_id = $matches[1];

        switch ($request_method) {
            case 'PUT':
                TaskController::updateTask($user_id, $task_id);
                break;
            case 'DELETE':
                TaskController::deleteTask($user_id, $task_id);
                break;
            default:
                http_response_code(405);
                echo json_encode(['error' => 'Method not allowed']);
        }
    } elseif ($request_uri == '/api/tasks') {
        switch ($request_method) {
            case 'GET':
                TaskController::getTasks($user_id);
                break;
            case 'POST':
                TaskController::createTask($user_id);
                break;
            default:
                http_response_code(405);
                echo json_encode(['error' => 'Method not allowed']);
        }
    } elseif ($request_uri == '/api/me') {
        switch ($request_method) {
            case 'GET':
                UserController::getMe($user_id);
                break;
            default:
                http_response_code(405);
                echo json_encode(['error' => 'Method not allowed']);
        }
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Not found']);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
