<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthMiddleware {
    public static function handle() {
        if (!isset($_SERVER['HTTP_AUTHORIZATION'])) {
            respond('error', null,
                'Unauthorized access. Please log in.', [], 401);
        }

        $token = str_replace('Bearer ', '', $_SERVER['HTTP_AUTHORIZATION']);

        try {
            $decoded = JWT::decode($token, new Key(JWT_SECRET, JWT_ALGORITHM));
            return $decoded->user_id;
        } catch (Exception $e) {
            respond('error', null,
                'Unauthorized access. Please log in.', [], 401);
        }
    }
}

