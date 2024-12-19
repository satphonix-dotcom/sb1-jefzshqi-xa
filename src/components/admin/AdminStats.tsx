import React from 'react';
import { useAppSelector } from '../../hooks';
import { formatPrice } from '../../utils/formatters';

const AdminStats: React.FC = () => {
  const { stats } = useAppSelector(state => state.admin);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
        <p className="mt-2 text-3xl font-bold text-gray-900">
          {formatPrice(stats.totalRevenue)}
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Active Users</h3>
        <p className="mt-2 text-3xl font-bold text-gray-900">
          {stats.activeUsers}
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Active Vendors</h3>
        <p className="mt-2 text-3xl font-bold text-gray-900">
          {stats.activeVendors}
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
        <p className="mt-2 text-3xl font-bold text-gray-900">
          {stats.totalProducts}
        </p>
      </div>
    </div>
  );
};

export default AdminStats;