# API Documentation

This document describes the structure and behavior of the API endpoints for the
task management application. All responses follow a consistent structure with
the fields `status`, `data`, `message`, and `errors`.

## General Response Structure

All API responses have the following structure:

```json
{
  "status": "success" | "error",
  "data": {},          // Data (only present if status === "success")
  "message": "",       // Human-readable message for the user
  "errors": []         // Detailed errors (only present if status === "error")
}
```

- **`status`:** Indicates the result of the operation (`"success"` or
  `"error"`).
- **`data`:** Contains useful data (e.g., task details, user information).
  Present only on success.
- **`message`:** A human-readable message for the user. Present in both success
  and error responses.
- **`errors`:** An array of detailed errors (e.g., validation errors). Present
  only on errors.

---

## Endpoints

### 1. Register User
**POST `/api/register`**

Registers a new user.

#### Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Success Response (HTTP 201):
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
    } ,
    "token": "abc123xyz"
  },
  "message": "User registered successfully."
}
```

#### Possible Errors:
- **400 Bad Request (Invalid Input):**
  ```json
  {
    "status": "error",
    "message": "Invalid input data.",
    "errors": [
      { "field": "email", "message": "Email is already taken." },
      { "field": "password", "message": "Password must be at least 8 characters long." }
    ]
  }
  ```

- **409 Conflict (Email Already Exists):**
  ```json
  {
    "status": "error",
    "message": "Email already exists. Please use a different email address.",
    "errors": []
  }
  ```

- **500 Internal Server Error:**
  ```json
  {
    "status": "error",
    "message": "An unexpected error occurred while registering the user.",
    "errors": []
  }
  ```

---

### 2. Login User
**POST `/api/login`**

Authenticates a user and returns a token.

#### Request Body:
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Success Response (HTTP 200):
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
    } ,
    "token": "abc123xyz"
  },
  "message": "Login successful."
}
```

#### Possible Errors:
- **400 Bad Request (Missing Credentials):**
  ```json
  {
    "status": "error",
    "message": "Email and password are required.",
    "errors": []
  }
  ```

- **401 Unauthorized (Invalid Credentials):**
  ```json
  {
    "status": "error",
    "message": "Invalid credentials.",
    "errors": []
  }
  ```

- **500 Internal Server Error:**
  ```json
  {
    "status": "error",
    "message": "An unexpected error occurred while logging in.",
    "errors": []
  }
  ```

---

### 3. Get Current User Data
**GET `/api/me`**

Retrieves data for the currently authenticated user. Requires a valid JWT token
in the `Authorization` header.

#### Headers:
```
Authorization: Bearer <token>
```

#### Success Response (HTTP 200):
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "message": "User data retrieved successfully."
}
```

#### Possible Errors:
- **401 Unauthorized (Missing or Invalid Token):**
  ```json
  {
    "status": "error",
    "message": "Unauthorized access. Please log in.",
    "errors": []
  }
  ```

- **404 Not Found (User Not Found):**
  ```json
  {
    "status": "error",
    "message": "User not found.",
    "errors": []
  }
  ```

- **500 Internal Server Error:**
  ```json
  {
    "status": "error",
    "message": "An unexpected error occurred while retrieving user data.",
    "errors": []
  }
  ```

---

### 4. Get Tasks
**GET `/api/tasks`**

Retrieves a list of tasks for the authenticated user. Requires a valid JWT token
in the `Authorization` header.

#### Headers:
```
Authorization: Bearer <token>
```

#### Success Response (HTTP 200):
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "title": "Task 1",
      "description": "Description 1",
      "status": "assigned"
    },
    {
      "id": 2,
      "title": "Task 2",
      "description": "Description 2",
      "status": "in_progress"
    }
  ],
  "message": "Tasks retrieved successfully."
}
```

#### Possible Errors:
- **401 Unauthorized (Missing or Invalid Token):**
  ```json
  {
    "status": "error",
    "message": "Unauthorized access. Please log in.",
    "errors": []
  }
  ```

- **500 Internal Server Error:**
  ```json
  {
    "status": "error",
    "message": "An unexpected error occurred while retrieving tasks.",
    "errors": []
  }
  ```

---

### 5. Create Task
**POST `/api/tasks`**

Creates a new task for the authenticated user. Requires a valid JWT token in the
`Authorization` header.

#### Headers:
```
Authorization: Bearer <token>
```

#### Request Body:
```json
{
  "title": "New Task",
  "description": "This is a new task",
  "status": "assigned"
}
```

#### Success Response (HTTP 201):
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "title": "New Task",
    "description": "This is a new task",
    "status": "assigned"
  },
  "message": "Task created successfully."
}
```

#### Possible Errors:
- **400 Bad Request (Validation Errors):**
  ```json
  {
    "status": "error",
    "message": "Invalid input data.",
    "errors": [
      { "field": "title", "message": "Title is required." },
      { "field": "status", "message": "Invalid status. Allowed values: assigned, in_progress, completed, cancelled." }
    ]
  }
  ```

- **401 Unauthorized (Missing or Invalid Token):**
  ```json
  {
    "status": "error",
    "message": "Unauthorized access. Please log in.",
    "errors": []
  }
  ```

- **500 Internal Server Error:**
  ```json
  {
    "status": "error",
    "message": "An unexpected error occurred while creating the task.",
    "errors": []
  }
  ```

---

### 6. Update Task
**PUT `/api/tasks/:id`**

Updates a task by its ID. Requires a valid JWT token in the `Authorization`
header.

#### Headers:
```
Authorization: Bearer <token>
```

#### Request Body:
```json
{
  "title": "Updated Task",
  "description": "This is an updated task",
  "status": "completed"
}
```

#### Success Response (HTTP 200):
```json
{
  "status": "success",
  "message": "Task updated successfully."
}
```

#### Possible Errors:
- **400 Bad Request (Validation Errors):**
  ```json
  {
    "status": "error",
    "message": "Invalid input data.",
    "errors": [
      { "field": "title", "message": "Title is required." }
    ]
  }
  ```

- **401 Unauthorized (Missing or Invalid Token):**
  ```json
  {
    "status": "error",
    "message": "Unauthorized access. Please log in.",
    "errors": []
  }
  ```

- **404 Not Found (Task Not Found):**
  ```json
  {
    "status": "error",
    "message": "Task not found.",
    "errors": []
  }
  ```

- **500 Internal Server Error:**
  ```json
  {
    "status": "error",
    "message": "An unexpected error occurred while updating the task.",
    "errors": []
  }
  ```

---

### 7. Delete Task
**DELETE `/api/tasks/:id`**

Deletes a task by its ID. Requires a valid JWT token in the `Authorization`
header.

#### Headers:
```
Authorization: Bearer <token>
```

#### Success Response (HTTP 200):
```json
{
  "status": "success",
  "message": "Task deleted successfully."
}
```

#### Possible Errors:
- **401 Unauthorized (Missing or Invalid Token):**
  ```json
  {
    "status": "error",
    "message": "Unauthorized access. Please log in.",
    "errors": []
  }
  ```

- **404 Not Found (Task Not Found):**
  ```json
  {
    "status": "error",
    "message": "Task not found.",
    "errors": []
  }
  ```

- **500 Internal Server Error:**
  ```json
  {
    "status": "error",
    "message": "An unexpected error occurred while deleting the task.",
    "errors": []
  }
  ```

---

