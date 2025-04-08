import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import TasksPage from '../pages/TasksPage';

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/tasks"
        element={isAuthenticated ? <TasksPage /> : <Navigate to="/login" />}
      />

      <Route
        path="/login"
        element={!isAuthenticated ? <LoginPage /> : <Navigate to="/tasks" />}
      />
      <Route
        path="/signup"
        element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/tasks" />}
      />

      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? '/tasks' : '/login'} />}
      />
    </Routes>
  );
};

export default AppRoutes;

