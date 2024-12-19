import React from 'react';
import { useAppSelector } from '../../hooks';
import AdminStats from './AdminStats';
import UserManagement from './UserManagement';
import VendorApprovals from './VendorApprovals';
import ProductApprovals from './ProductApprovals';

const AdminDashboard: React.FC = () => {
  const { user } = useAppSelector(state => state.auth);

  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Access denied. Admin privileges required.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
      
      <AdminStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Pending Vendor Approvals</h2>
          <VendorApprovals />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Product Approvals</h2>
          <ProductApprovals />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">User Management</h2>
        <UserManagement />
      </div>
    </div>
  );
};

export default AdminDashboard;