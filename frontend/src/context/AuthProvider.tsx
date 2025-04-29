import { createContext, useEffect, useContext, useState } from 'react';
import { getAuthToken, setAuthToken, removeAuthToken } from '../utils/jwt';
import { api } from '../api/Api';


interface AuthContextType {
  token: string;
  userName: string | null;
  login: (token: string, userName: string) => void;
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
  const [token, setToken] = useState<string>(getAuthToken() || '');
  const [userName, setUserName] = useState<string | null>(null);
  
  const login = (newToken: string, userName: string) => {
    setToken(newToken);
    setAuthToken(newToken);
    setUserName(userName);
  };

  const logout = () => {
    setToken('');
    removeAuthToken();
    setUserName(null)
  };

  const checkAuth = async (): Promise<boolean> => {
    if (!token) return false;

    try {
      const response = await api.fetchMe(token);
      if (response.status == 'success') {
        setUserName(response.data.name);
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
    checkAuth();
  }, []);

  const value = {
    token,
    userName,
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

