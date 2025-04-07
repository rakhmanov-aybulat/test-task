import React, { createContext, useContext, useState } from 'react';
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

  return (
    <AuthContext.Provider value={{ token, user, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
