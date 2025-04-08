<?php
use Firebase\JWT\JWT;

class AuthController {
    public static function register() {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            if (!$data) {
                respond('error', null, 'Invalid JSON data.', [], 400);
            }

            $errors = [];
            if (empty($data['name'])) {
                $errors[] = [
                    'field' => 'name',
                    'message' => 'Name is required.'
                ];
            }
            if (empty($data['email'])) {
                $errors[] = [
                    'field' => 'email',
                    'message' => 'Email is required.'
                ];
            } elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
                $errors[] = [
                    'field' => 'email',
                    'message' => 'Invalid email format.'
                ];
            }
            if (empty($data['password'])) {
                $errors[] = [
                    'field' => 'password',
                    'message' => 'Password is required.'
                ];
            } elseif (strlen($data['password']) < 8) {
                $errors[] = [
                    'field' => 'password',
                    'message' => 'Password must be at least 8 characters long.'
                ];
            }

            if (!empty($errors)) {
                respond('error', null, 'Invalid input data.', $errors, 400);
            }

            $db = Database::getConnection();

            $stmt = $db->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->execute([$data['email']]);
            if ($stmt->fetch()) {
                respond( 'error', null, 'Email already exists. ' .
                    'Please use a different email address.', [], 409);
            }

            $stmt = $db->prepare("INSERT INTO users " .
                "(name, email, password_hash) VALUES (?, ?, ?)");
            $stmt->execute([
                $data['name'],
                $data['email'],
                password_hash($data['password'], PASSWORD_BCRYPT)
            ]);

            $user_id = $db->lastInsertId();
            $token = self::generateToken($user_id);

            respond('success', [
                'user' => [
                    'id' => $user_id,
                    'name' => $data['name'],
                    'email' => $data['email'],
                ],
                'token' => $token,
            ], 'User registered successfully.', [], 201);

        } catch (Exception $e) {
            error_log($e->getMessage());
            respond('error', null, 'An unexpected error occurred ' .
                'while registering the user.', [], 500);
        }
    }

    public static function login() {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            if (!$data) {
                respond('error', null, 'Invalid JSON data.', [], 400);
            }

            if (empty($data['email']) || empty($data['password'])) {
                respond('error', null,
                    'Email and password are required.', [], 400);
            }

            $db = Database::getConnection();
            $stmt = $db->prepare("SELECT id, name, email, password_hash " .
                                "FROM users WHERE email = ?");

            $stmt->execute([$data['email']]);
            $user = $stmt->fetch();

            if (
                !$user ||
                !password_verify($data['password'], $user['password_hash'])
            ) {
                respond('error', null, 'Invalid credentials.', [], 401);
            }

            $token = self::generateToken($user['id']);

            respond('success', [
                'user' => [
                    'id' => $user['id'],
                    'name' => $user['name'],
                    'email' => $user['email'],
                ],
                'token' => $token,
            ], 'Login successful.', [], 200);

        } catch (Exception $e) {
            error_log($e->getMessage());
            respond('error', null,
                'An unexpected error occurred while logging in.', [], 500);
        }
    }

    private static function generateToken($user_id) {
        $payload = [
            'user_id' => $user_id,
            'exp' => time() + (60 * 60 * 24)
        ];
        
        return JWT::encode($payload, JWT_SECRET, JWT_ALGORITHM);
    }
}

