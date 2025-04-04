import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import TasksPage from './pages/TasksPage';
import { User } from './types/User';
import Api from './api/Api';

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const api = new Api('http://localhost');

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await api.fetchUserData();
        // TODO: add data validation
        setUser(userData);
      } catch (error) {
        console.error('Failed to load user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/tasks" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/tasks" /> : <SignUpPage />}
        />

        <Route
          path="/tasks"
          element={user ? <TasksPage user={user} /> : <Navigate to="/login" />}
        />

        <Route
          path="*"
          element={user ? <Navigate to="/tasks" /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
