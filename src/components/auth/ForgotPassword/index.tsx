import React from 'react';
import ForgotPasswordForm from './ForgotPasswordForm';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPassword;