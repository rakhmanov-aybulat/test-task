<?php
class TaskController {
    public static function getTasks($user_id) {
        $db = Database::getConnection();
        $stmt = $db->prepare("SELECT * FROM tasks WHERE user_id = ?");
        $stmt->execute([$user_id]);
        $tasks = $stmt->fetchAll();
        echo json_encode($tasks);
    }

    public static function createTask($user_id) {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (empty($data['title'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Title is required']);
            return;
        }

        $db = Database::getConnection();
        $stmt = $db->prepare("INSERT INTO tasks (user_id, title, description, status) VALUES (?, ?, ?, 'assigned')");
        $stmt->execute([
            $user_id,
            $data['title'],
            $data['description'] ?? null
        ]);

        echo json_encode(['task_id' => $db->lastInsertId()]);
    }
}
