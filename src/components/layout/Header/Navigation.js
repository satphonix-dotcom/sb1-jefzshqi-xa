import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navigation = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);

  return (
    <nav className="hidden md:flex items-center space-x-8">
      <Link to="/products" className="text-gray-300 hover:text-white">
        Products
      </Link>
      {isAuthenticated && user?.role === 'vendor' && (
        <Link to="/vendor/dashboard" className="text-gray-300 hover:text-white">
          Vendor Dashboard
        </Link>
      )}
      {isAuthenticated && user?.role === 'admin' && (
        <Link to="/admin/dashboard" className="text-gray-300 hover:text-white">
          Admin Dashboard
        </Link>
      )}
      <Link to="/about" className="text-gray-300 hover:text-white">
        About
      </Link>
      <Link to="/contact" className="text-gray-300 hover:text-white">
        Contact
      </Link>
    </nav>
  );
};

export default Navigation;