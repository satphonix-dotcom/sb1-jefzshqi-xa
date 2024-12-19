```typescript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { clearCart } from '../../store/slices/cartSlice';
import PaymentModal from '../payment/PaymentModal';
import { formatPrice } from '../../utils/formatters';

interface PaymentStepProps {
  orderId: string;
  amount: string;
}

const PaymentStep: React.FC<PaymentStepProps> = ({ orderId, amount }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handlePaymentSuccess = (transactionHash: string) => {
    // Clear cart and redirect to confirmation page
    dispatch(clearCart());
    navigate(`/order-confirmation/${orderId}`, {
      state: { transactionHash }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Complete Your Purchase</h2>
      
      <div className="bg-gray-50 p-4 rounded mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Amount:</span>
          <span className="text-2xl font-bold">{formatPrice(amount)} USDC</span>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-gray-600">
          Please ensure you have sufficient USDC in your wallet before proceeding with the payment.
        </p>

        <button
          onClick={() => setShowPaymentModal(true)}
          className="w-full bg-yellow-400 text-gray-900 py-3 px-6 rounded-md hover:bg-yellow-500"
        >
          Proceed to Payment
        </button>
      </div>

      {showPaymentModal && (
        <PaymentModal
          orderId={orderId}
          amount={amount}
          onSuccess={handlePaymentSuccess}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  );
};

export default PaymentStep;
```