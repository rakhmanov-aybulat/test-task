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
  "data": { "id": 1, "name": "John Doe", "email": "john@example.com" },
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
- **500 Internal Server Error:**
  ```json
  {
    "status": "error",
    "message": "An unexpected error occurred while registering the user."
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
  "data": { "token": "abc123xyz" },
  "message": "Login successful."
}
```

#### Possible Errors:
- **400 Bad Request (Invalid Credentials):**
  ```json
  {
    "status": "error",
    "message": "Invalid email or password."
  }
  ```
- **500 Internal Server Error:**
  ```json
  {
    "status": "error",
    "message": "An unexpected error occurred while logging in."
  }
  ```

---

### 3. Get Current User
**GET `/api/me`**

Retrieves information about the currently authenticated user. Requires an
authorization token.

#### Headers:
```
Authorization: Bearer <token>
```

#### Success Response (HTTP 200):
```json
{
  "status": "success",
  "data": { "id": 1, "name": "John Doe", "email": "john@example.com" },
  "message": "User data retrieved successfully."
}
```

#### Possible Errors:
- **401 Unauthorized (Missing or Invalid Token):**
  ```json
  {
    "status": "error",
    "message": "Unauthorized access. Please log in."
  }
  ```
- **500 Internal Server Error:**
  ```json
  {
    "status": "error",
    "message": "An unexpected error occurred while retrieving user data."
  }
  ```

---

### 4. Create Task
**POST `/api/tasks`**

Creates a new task for the authenticated user. Requires an authorization token.

#### Headers:
```
Authorization: Bearer <token>
```

#### Request Body:
```json
{
  "title": "New Task",
  "description": "This is a new task",
  "status": "Assigned"
}
```

#### Success Response (HTTP 201):
```json
{
  "status": "success",
  "data": { "id": 1, "title": "New Task", "description": "This is a new task", "status": "Assigned" },
  "message": "Task created successfully."
}
```

#### Possible Errors:
- **400 Bad Request (Invalid Input):**
  ```json
  {
    "status": "error",
    "message": "Invalid input data.",
    "errors": [
      { "field": "title", "message": "Title is required." },
      { "field": "description", "message": "Description must be at least 10 characters long." }
    ]
  }
  ```
- **401 Unauthorized (Missing or Invalid Token):**
  ```json
  {
    "status": "error",
    "message": "Unauthorized access. Please log in."
  }
  ```
- **500 Internal Server Error:**
  ```json
  {
    "status": "error",
    "message": "An unexpected error occurred while creating the task."
  }
  ```

---

### 5. Get Tasks
**GET `/api/tasks`**

Retrieves a list of tasks for the authenticated user. Requires an authorization
token.

#### Headers:
```
Authorization: Bearer <token>
```

#### Success Response (HTTP 200):
```json
{
  "status": "success",
  "data": [
    { "id": 1, "title": "Task 1", "description": "Description 1", "status": "Assigned" },
    { "id": 2, "title": "Task 2", "description": "Description 2", "status": "In Progress" }
  ],
  "message": "Tasks retrieved successfully."
}
```

#### Possible Errors:
- **401 Unauthorized (Missing or Invalid Token):**
  ```json
  {
    "status": "error",
    "message": "Unauthorized access. Please log in."
  }
  ```
- **500 Internal Server Error:**
  ```json
  {
    "status": "error",
    "message": "An unexpected error occurred while retrieving tasks."
  }
  ```

---

### 6. Update Task
**PUT `/api/tasks/:id`**

Updates a task by its ID. Requires an authorization token.

#### Headers:
```
Authorization: Bearer <token>
```

#### Request Body:
```json
{
  "title": "Updated Task",
  "description": "This is an updated task",
  "status": "Completed"
}
```

#### Success Response (HTTP 200):
```json
{
  "status": "success",
  "data": { "id": 1, "title": "Updated Task", "description": "This is an updated task", "status": "Completed" },
  "message": "Task updated successfully."
}
```

#### Possible Errors:
- **400 Bad Request (Invalid Input):**
  ```json
  {
    "status": "error",
    "message": "Invalid input data.",
    "errors": [
      { "field": "status", "message": "Status must be one of 'Assigned', 'In Progress', 'Completed', 'Cancelled'." }
    ]
  }
  ```
- **401 Unauthorized (Missing or Invalid Token):**
  ```json
  {
    "status": "error",
    "message": "Unauthorized access. Please log in."
  }
  ```
- **404 Not Found (Task Not Found):**
  ```json
  {
    "status": "error",
    "message": "Task not found."
  }
  ```
- **500 Internal Server Error:**
  ```json
  {
    "status": "error",
    "message": "An unexpected error occurred while updating the task."
  }
  ```

---

### 7. Delete Task
**DELETE `/api/tasks/:id`**

Deletes a task by its ID. Requires an authorization token.

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
    "message": "Unauthorized access. Please log in."
  }
  ```
- **404 Not Found (Task Not Found):**
  ```json
  {
    "status": "error",
    "message": "Task not found."
  }
  ```
- **500 Internal Server Error:**
  ```json
  {
    "status": "error",
    "message": "An unexpected error occurred while deleting the task."
  }
  ```

---

