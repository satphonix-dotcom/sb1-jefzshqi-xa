import React from 'react';
import { useAuth } from '../../hooks/useAuth';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  useAuth(); // This hook handles the authentication state
  return <>{children}</>;
};

export default AuthProvider;