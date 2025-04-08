import { createContext, useEffect, useContext, useState } from 'react';
import { getAuthToken, setAuthToken, removeAuthToken } from '../utils/jwt';
import { api } from '../api/Api';


interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(getAuthToken());
  const [user, setUser] = useState<User | null>(null);
  
  const isAuthenticated = !!token && !!user;

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

  useEffect(() => {
    checkAuth(); // Проверяем аутентификацию при монтировании
  }, []);

  const value = {
    token,
    user,
    isAuthenticated,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
