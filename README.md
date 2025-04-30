# Task Management Application

A full-stack web application for managing tasks with user authentication, built
with React (TypeScript) frontend and PHP backend.

## Features

- User authentication (register, login, logout)
- Create, read, update, and delete tasks
- Task status management (Assigned, In Progress, Completed, Cancelled)
- Filter tasks by status
- Responsive design for all device sizes
- Secure JWT authentication
- Form validation

## Technologies

### Frontend
- React 18 with TypeScript
- Vite build tool
- React Router for navigation
- CSS Modules for styling
- Fetch API for HTTP requests

### Backend
- PHP 8.2
- MySQL database
- Firebase JWT for authentication
- PDO for database access
- RESTful API design

### Infrastructure
- Docker containers
- Nginx reverse proxy
- MySQL database service

## Getting Started

### Prerequisites

- Docker and Docker Compose installed
- Node.js (for frontend development)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/task-management-app.git
   cd task-management-app
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```env
   MYSQL_ROOT_PASSWORD=your_root_password
   MYSQL_USER=your_db_user
   MYSQL_PASSWORD=your_db_password
   MYSQL_DATABASE=task_manager
   JWT_SECRET=your_jwt_secret_key
   ```

3. Build the frontend:
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Build the frontend:
     ```bash
     npm run build
     ```
   - Return to the root directory:
     ```bash
     cd ..
     ```

4. Start the application:
   ```bash
   docker-compose up -d
   ```

5. The application will be available at:
   - Frontend: [http://localhost](http://localhost)
   - Backend API: [http://localhost/api](http://localhost/api)

### Development

For frontend development:

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

> **Note:** During development, you can use `npm run dev` to run the frontend locally while still connecting to the backend running in Docker.

## API Documentation

The backend provides a RESTful API with the following endpoints:

- `POST /api/register` - Register a new user
- `POST /api/login` - Authenticate a user
- `GET /api/me` - Get current user data
- `GET /api/tasks` - Get all tasks for the current user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

Detailed API documentation is available in [docs/api.md](docs/api.md).

## Project Structure

```
.
├── backend/               # PHP backend code
│   ├── db/                # Database initialization scripts
│   ├── public/            # Publicly accessible files
│   ├── src/               # PHP source code
│   │   ├── config/        # Configuration files
│   │   ├── controllers/   # API controllers
│   │   ├── helpers/       # Helper functions
│   │   └── middleware/    # Middleware
│   └── Dockerfile         # Backend Docker configuration
├── frontend/              # React frontend
│   ├── public/            # Static assets
│   ├── src/               # React source code
│   │   ├── api/           # API client
│   │   ├── assets/        # Images and icons
│   │   ├── components/    # React components
│   │   ├── context/       # React context providers
│   │   ├── pages/         # Page components
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Utility functions
│   └── vite.config.ts     # Vite configuration
├── proxy/                 # Nginx configuration
├── docs/                  # Documentation
└── docker-compose.yaml    # Docker Compose configuration
```

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

