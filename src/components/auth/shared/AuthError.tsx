import React from 'react';

interface AuthErrorProps {
  message: string;
}

const AuthError: React.FC<AuthErrorProps> = ({ message }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
      {message}
    </div>
  );
};

export default AuthError;