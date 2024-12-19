import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks';

const Navigation: React.FC = () => {
  const { isAuthenticated, user } = useAppSelector(state => state.auth);

  return (
    <nav className="hidden md:flex items-center space-x-8">
      <Link to="/products" className="text-gray-300 hover:text-white transition-colors">
        Shop
      </Link>
      <Link to="/categories" className="text-gray-300 hover:text-white transition-colors">
        Categories
      </Link>
      {isAuthenticated && user?.role === 'vendor' && (
        <Link to="/vendor/dashboard" className="text-gray-300 hover:text-white transition-colors">
          Vendor Dashboard
        </Link>
      )}
      {isAuthenticated && user?.role === 'admin' && (
        <Link to="/admin/dashboard" className="text-gray-300 hover:text-white transition-colors">
          Admin Dashboard
        </Link>
      )}
      <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
        About
      </Link>
      <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
        Contact
      </Link>
    </nav>
  );
};

export default Navigation;