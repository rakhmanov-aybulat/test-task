<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthMiddleware {
    public static function handle() {
        $headers = getallheaders();
        
        if (!isset($headers['Authorization'])) {
            http_response_code(401);
            echo json_encode(['error' => 'Token missing']);
            exit;
        }

        $token = str_replace('Bearer ', '', $headers['Authorization']);

        try {
            $decoded = JWT::decode($token, new Key(JWT_SECRET, JWT_ALGORITHM));
            return $decoded->user_id;
        } catch (Exception $e) {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid token']);
            exit;
        }
    }
}
