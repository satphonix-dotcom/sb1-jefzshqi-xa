import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

const Home: React.FC = () => {
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  const handleVendorRegistration = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/vendor/register' } });
    } else {
      navigate('/vendor/register');
    }
  };

  return (
    // ... other JSX ...
    <div className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Selling?</h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of vendors already selling on VelvetCoin. Low fees, secure payments, and access to crypto-savvy customers.
        </p>
        <button
          onClick={handleVendorRegistration}
          className="inline-block bg-yellow-400 px-8 py-3 text-base font-medium text-gray-900 hover:bg-yellow-500 rounded-md transition-colors"
        >
          Become a Vendor
        </button>
      </div>
    </div>
    // ... other JSX ...
  );
};

export default Home;