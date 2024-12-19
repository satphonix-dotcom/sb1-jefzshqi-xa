```typescript
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { approveProduct } from '../../store/slices/adminSlice';
import { formatPrice } from '../../utils/formatters';

const ProductApprovals: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pendingProducts, loading } = useAppSelector(state => state.admin);

  const handleApprove = async (productId: string) => {
    try {
      await dispatch(approveProduct(productId)).unwrap();
    } catch (error) {
      console.error('Failed to approve product:', error);
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
        {pendingProducts.map(product => (
          <div key={product._id} className="p-6">
            <div className="flex items-start space-x-4">
              <img
                src={product.images[0]?.url}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-500">By {product.seller.businessName}</p>
                  </div>
                  <p className="text-lg font-medium">{formatPrice(product.price)}</p>
                </div>
                <p className="mt-2 text-sm text-gray-600">{product.description}</p>
                <div className="mt-4">
                  <button
                    onClick={() => handleApprove(product._id)}
                    className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-md hover:bg-yellow-500"
                  >
                    Approve Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {pendingProducts.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No pending product approvals
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductApprovals;
```