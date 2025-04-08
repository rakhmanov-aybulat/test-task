<?php

function respond($status, $data = null, $message = '',
                $errors = [], $httpCode = 200) {
    http_response_code($httpCode);
    echo json_encode([
        'status' => $status,
        'data' => $data,
        'message' => $message,
        'errors' => $errors,
    ]);
    exit;
}

