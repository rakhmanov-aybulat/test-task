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

    public static function updateTask($user_id, $task_id) {
        $data = json_decode(file_get_contents('php://input'), true);

        if (empty($data['title'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Title is required']);
            return;
        }

        $db = Database::getConnection();
        $stmt = $db->prepare("UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?");
        $stmt->execute([
            $data['title'],
            $data['description'] ?? null,
            $data['status'] ?? 'assigned',
            $task_id,
            $user_id
        ]);

        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(['error' => 'Task not found']);
            return;
        }

        echo json_encode(['message' => 'Task updated']);
    }

    public static function deleteTask($user_id, $task_id) {
        $db = Database::getConnection();
        $stmt = $db->prepare("DELETE FROM tasks WHERE id = ? AND user_id = ?");
        $stmt->execute([$task_id, $user_id]);

        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(['error' => 'Task not found']);
            return;
        }

        echo json_encode(['message' => 'Task deleted']);
    }
}
