import React, { createContext, useContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { loginSuccess, loginFailure } from '../store/slices/authSlice';
import { AuthService } from '../services/auth.service';
import { User } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, loading, error } = useAppSelector(state => state.auth);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await AuthService.getCurrentUser();
        dispatch(loginSuccess({ user, token: localStorage.getItem('token') }));
      } catch (error) {
        dispatch(loginFailure(error instanceof Error ? error.message : 'Authentication failed'));
      }
    };

    if (!isAuthenticated && !loading) {
      initAuth();
    }
  }, [dispatch, isAuthenticated, loading]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};