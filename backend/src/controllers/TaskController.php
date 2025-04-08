<?php

class TaskController {
    public static function getTasks($user_id) {
        try {
            $db = Database::getConnection();
            $stmt = $db->prepare("SELECT * FROM tasks WHERE user_id = ?");
            $stmt->execute([$user_id]);
            $tasks = $stmt->fetchAll();
    
            respond('success', $tasks,'Tasks retrieved successfully.', [], 200);
        } catch (Exception $e) {
            error_log($e->getMessage());
            respond('error', null, 'An unexpected error occurred ' .
                'while retrieving tasks.', [], 500);
        }
    }
    
    public static function createTask($user_id) {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            if (!$data) {
                respond('error', null, 'Invalid JSON data.', [], 400);
            }
    
            $errors = [];
            if (empty($data['title'])) {
                $errors[] = [
                    'field' => 'title',
                    'message' => 'Title is required.'
                ];
            }

            $allowedStatuses = [
                'assigned',
                'in_progress',
                'completed',
                'cancelled'
            ];

            if ( !empty($data['status']) &&
                !in_array($data['status'], $allowedStatuses)) {
                $errors[] = [
                    'field' => 'status',
                    'message' => 'Invalid status. Allowed values: ' .
                                'assigned, in_progress, completed, cancelled.'
                ];
            } 

            if (!empty($errors)) {
                respond('error', null, 'Invalid input data.', $errors, 400);
            }
    
            $db = Database::getConnection();
            $stmt = $db->prepare(
                "INSERT INTO tasks (user_id, title, description, status) " .
                "VALUES (?, ?, ?, ?)"
            );
            $stmt->execute([
                $user_id,
                $data['title'],
                $data['description'] ?? '',
                $data['status']
            ]);
    
            $task_id = $db->lastInsertId();
            respond('success', [
                'id' => $task_id,
                'title' => $data['title'],
                'description' => $data['description'],
                'status' => $data['status'],
            ], 'Task created successfully.', [], 201);

        } catch (Exception $e) {
            error_log($e->getMessage());
            respond('error', null, 'An unexpected error occurred ' .
                'while creating the task.', [], 500);
        }
    }

    public static function updateTask($user_id, $task_id) {
        try {
            $data = json_decode(file_get_contents('php://input'), true);
            if (!$data) {
                respond('error', null, 'Invalid JSON data.', [], 400);
            }
    
            $errors = [];
            if (empty($data['title'])) {
                $errors[] = [
                    'field' => 'title',
                    'message' => 'Title is required.'
                ];
            }
            
            if (empty($data['description'])) {
                $errors[] = [
                    'field' => 'description',
                    'message' => 'Description is required.'
                ];
            }
    
            if (!empty($errors)) {
                respond('error', null, 'Invalid input data.', $errors, 400);
            }
    
            $db = Database::getConnection();
            $stmt = $db->prepare(
                "UPDATE tasks SET title = ?, description = ?, status = ? " .
                "WHERE id = ? AND user_id = ?");
            $stmt->execute([
                $data['title'],
                $data['description'],
                $data['status'],
                $task_id,
                $user_id
            ]);
    
            if ($stmt->rowCount() === 0) {
                respond('error', null, 'Task not found.', [], 404);
            }
    
            respond('success', null, 'Task updated successfully.', [], 200);

        } catch (Exception $e) {
            error_log($e->getMessage());
            respond('error', null, 'An unexpected error occurred ' .
                'while updating the task.', [], 500);
        }
    }

    public static function deleteTask($user_id, $task_id) {
        try {
            $db = Database::getConnection();
            $stmt = $db->prepare(
                "DELETE FROM tasks WHERE id = ? AND user_id = ?");
            $stmt->execute([$task_id, $user_id]);
    
            if ($stmt->rowCount() === 0) {
                respond('error', null, 'Task not found.', [], 404);
            }
    
            respond('success', null, 'Task deleted successfully.', [], 200);
        } catch (Exception $e) {
            error_log($e->getMessage());
            respond('error', null, 'An unexpected error occurred ' .
                'while deleting the task.', [], 500);
        }
    }
}

