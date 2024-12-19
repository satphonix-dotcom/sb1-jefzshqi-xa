import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <img src="/logo.svg" alt="VelvetCoin" className="h-8 w-8" />
      <span className="text-xl font-bold text-white">
        Velvet<span className="text-yellow-400">Coin</span>
      </span>
    </Link>
  );
};

export default Logo;