import React from 'react';
import LoginForm from './LoginForm';
import AuthLayout from '../shared/AuthLayout';
import { useRedirectAuthenticated } from '../../../hooks/useRedirectAuthenticated';

const Login: React.FC = () => {
  useRedirectAuthenticated();

  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle="Enter your credentials to access your account"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;