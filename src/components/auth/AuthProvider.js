import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '../../store/slices/authSlice';
import { getCurrentUser } from '../../services/auth.service';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const user = await getCurrentUser();
          dispatch(loginSuccess({ token, user }));
        } catch (error) {
          dispatch(loginFailure(error.message));
        }
      }
    };

    initAuth();
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;