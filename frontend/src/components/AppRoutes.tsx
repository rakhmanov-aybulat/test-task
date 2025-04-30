import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import TasksPage from '../pages/TasksPage';


const AppRoutes = () => {
  const { token } = useAuth();

  return (
    <Routes>
      <Route
        path="/tasks"
        element={token ? <TasksPage /> : <Navigate to="/login" />}
      />

      <Route
        path="/login"
        element={!token ? <LoginPage /> : <Navigate to="/tasks" />}
      />
      <Route
        path="/signup"
        element={!token ? <SignUpPage /> : <Navigate to="/tasks" />}
      />

      <Route
        path="*"
        element={<Navigate to={token ? '/tasks' : '/login'} />}
      />
    </Routes>
  );
};

export default AppRoutes;

