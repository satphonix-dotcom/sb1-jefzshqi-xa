import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-6">About VelvetCoin</h1>
        <p className="text-xl text-gray-600">
          Revolutionizing luxury commerce through the power of cryptocurrency
        </p>
      </div>

      <div className="prose max-w-none">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
          <p className="mb-4">
            VelvetCoin emerged from a vision to bridge the gap between luxury retail and cryptocurrency. 
            We believe in creating a seamless shopping experience where crypto holders can access premium 
            products while vendors can tap into the growing crypto economy.
          </p>
          <p>
            Our platform exclusively accepts USDC payments, ensuring stable and secure transactions 
            for both buyers and sellers. We've partnered with leading luxury brands and verified 
            vendors to bring you an unparalleled selection of authentic premium products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">100K+</div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">10K+</div>
            <div className="text-gray-600">Verified Vendors</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">500K+</div>
            <div className="text-gray-600">Products Listed</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">Why Choose VelvetCoin?</h2>
          <ul className="list-disc pl-6 space-y-4">
            <li>
              <strong>Secure Transactions:</strong> All payments are processed through 
              smart contracts on the blockchain, ensuring complete security and transparency.
            </li>
            <li>
              <strong>Verified Vendors:</strong> Our rigorous vendor verification process 
              ensures you're buying from legitimate sellers and authentic brands.
            </li>
            <li>
              <strong>Premium Support:</strong> Our dedicated support team is available 
              24/7 to assist with any questions or concerns.
            </li>
            <li>
              <strong>Fast Delivery:</strong> Global shipping with real-time tracking 
              and insurance for all orders.
            </li>
          </ul>
        </div>

        <div className="bg-gray-900 text-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
          <p className="mb-6">
            Whether you're a luxury brand looking to expand into crypto payments or a 
            shopper seeking premium products, VelvetCoin is your destination for secure 
            and sophisticated commerce.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/register"
              className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-md hover:bg-yellow-500 transition-colors"
            >
              Create Account
            </Link>
            <Link
              to="/vendor/register"
              className="bg-white text-gray-900 px-6 py-3 rounded-md hover:bg-gray-100 transition-colors"
            >
              Become a Vendor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;