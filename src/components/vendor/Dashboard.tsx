import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchVendorStats } from '../../store/slices/vendorSlice';
import VendorStats from './VendorStats';
import ProductList from './ProductList';
import OrderList from './OrderList';

const VendorDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.vendor);

  useEffect(() => {
    dispatch(fetchVendorStats());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-8">Vendor Dashboard</h1>
      
      <VendorStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <OrderList limit={5} />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          <ProductList limit={5} />
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;