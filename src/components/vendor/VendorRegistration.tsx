```typescript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { registerVendor } from '../../store/slices/vendorSlice';

const VendorRegistration: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const [formData, setFormData] = useState({
    businessName: '',
    businessAddress: '',
    taxId: '',
    phoneNumber: '',
    website: '',
    description: '',
    walletAddress: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await dispatch(registerVendor(formData)).unwrap();
      navigate('/vendor/dashboard');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to register as vendor');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    navigate('/login', { state: { from: '/vendor/register' } });
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Become a Vendor
        </h2>

        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form fields */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-500 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorRegistration;
```