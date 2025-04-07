import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';


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

export default PrivateRoute;

