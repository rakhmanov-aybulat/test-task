<?php
use Firebase\JWT\JWT;

class AuthController {
    public static function register() {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (empty($data['name']) || empty($data['email']) || empty($data['password'])) {
            http_response_code(400);
            echo json_encode(['error' => 'All fields are required']);
            return;
        }

        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid email format']);
            return;
        }

        $db = Database::getConnection();

        $stmt = $db->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$data['email']]);

        if ($stmt->fetch()) {
            http_response_code(409);
            echo json_encode(['error' => 'Email already exists']);
            return;
        }

        $stmt = $db->prepare("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)");
        $stmt->execute([
            $data['name'],
            $data['email'],
            password_hash($data['password'], PASSWORD_BCRYPT)
        ]);

        $user_id = $db->lastInsertId();
        $token = self::generateToken($user_id);
        
        echo json_encode([
            'status' => 'success',
            'user' => [
                'id' => $user_id,
                'name' => $data['name'],
                'email' => $data['email']
            ],
            'token' => $token
        ]);
    }

    public static function login() {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (empty($data['email']) || empty($data['password'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Email and password are required']);
            return;
        }

        $db = Database::getConnection();
        $stmt = $db->prepare("SELECT id, name, email, password_hash FROM users WHERE email = ?");
        $stmt->execute([$data['email']]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($data['password'], $user['password_hash'])) {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid credentials']);
            return;
        }

        $token = self::generateToken($user['id']);
        
        echo json_encode([
            'status' => 'success',
            'user' => [
                'id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email']
            ],
            'token' => $token
        ]);
    }

    private static function generateToken($user_id) {
        $payload = [
            'user_id' => $user_id,
            'exp' => time() + (60 * 60 * 24)
        ];
        
        return JWT::encode($payload, JWT_SECRET, JWT_ALGORITHM);
    }
}
