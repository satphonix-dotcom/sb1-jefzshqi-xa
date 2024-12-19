import React from 'react';
import { useAppSelector } from '../../hooks';
import { formatPrice } from '../../utils/formatters';

const VendorStats = () => {
  const { stats } = useAppSelector(state => state.vendor);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
        <p className="mt-2 text-3xl font-bold text-gray-900">
          {formatPrice(stats.totalSales)}
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Active Products</h3>
        <p className="mt-2 text-3xl font-bold text-gray-900">
          {stats.activeProducts}
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Pending Orders</h3>
        <p className="mt-2 text-3xl font-bold text-gray-900">
          {stats.pendingOrders}
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Average Rating</h3>
        <p className="mt-2 text-3xl font-bold text-gray-900">
          {stats.averageRating.toFixed(1)}
        </p>
      </div>
    </div>
  );
};

export default VendorStats;