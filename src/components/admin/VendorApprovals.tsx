```typescript
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { approveVendor } from '../../store/slices/adminSlice';
import { formatDate } from '../../utils/formatters';

const VendorApprovals: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pendingVendors, loading } = useAppSelector(state => state.admin);

  const handleApprove = async (vendorId: string) => {
    try {
      await dispatch(approveVendor(vendorId)).unwrap();
    } catch (error) {
      console.error('Failed to approve vendor:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="divide-y divide-gray-200">
        {pendingVendors.map(vendor => (
          <div key={vendor._id} className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">{vendor.businessName}</h3>
                <p className="text-sm text-gray-500">Applied: {formatDate(vendor.createdAt)}</p>
              </div>
              <button
                onClick={() => handleApprove(vendor._id)}
                className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-md hover:bg-yellow-500"
              >
                Approve
              </button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Contact</h4>
                <p className="mt-1">{vendor.phoneNumber}</p>
                <p className="text-sm text-gray-500">{vendor.email}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Business Details</h4>
                <p className="mt-1">{vendor.businessAddress}</p>
                <p className="text-sm text-gray-500">Tax ID: {vendor.taxId}</p>
              </div>
            </div>
          </div>
        ))}
        {pendingVendors.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No pending vendor approvals
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorApprovals;
```