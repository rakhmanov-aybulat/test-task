import React, { createContext, useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import TasksPage from './pages/TasksPage';
import { User } from './types/User';
import { getAuthToken, setAuthToken, removeAuthToken } from './utils/jwt';
import { api } from './api/Api';


interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(getAuthToken());
  const [user, setUser] = useState<User | null>(null);

  const login = (newToken: string, user: User) => {
    setToken(newToken);
    setUser(user);
    setAuthToken(newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    removeAuthToken();
  };

  const checkAuth = async (): Promise<boolean> => {
    if (!token) return false;

    try {
      const data = await api.fetchMe();
      console.log(data);
      console.log(data.status);
      if (data.status == 'success') {
        setUser(data.user);
        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { checkAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      const isValid = await checkAuth();
      setIsAuthenticated(isValid);
      setIsLoading(false);
    };

    verifyAuth();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <TasksPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
