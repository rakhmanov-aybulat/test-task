<?php

class UserController {
    public static function getMe($user_id) {
        try {
            $db = Database::getConnection();
            $stmt = $db->prepare(
                "SELECT id, name, email FROM users WHERE id = ?");
            $stmt->execute([$user_id]);
            $user = $stmt->fetch();
    
            if (!$user) {
                respond('error', null, 'User not found.', [], 404);
            }
    
            respond('success', [
                'id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email']
            ], 'User data retrieved successfully.', [], 200);

        } catch (Exception $e) {
            error_log($e->getMessage());
            respond('error', null, 'An unexpected error occurred ' .
                'while retrieving user data.', [], 500);
        }
    }
}

