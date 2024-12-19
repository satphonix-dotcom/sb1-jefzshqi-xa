import React from 'react';
import { Link } from 'react-router-dom';

interface AuthLinkProps {
  to: string;
  children: React.ReactNode;
}

const AuthLink: React.FC<AuthLinkProps> = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="font-medium text-primary hover:text-primary-dark transition-colors"
    >
      {children}
    </Link>
  );
};

export default AuthLink;