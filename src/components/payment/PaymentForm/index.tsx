import React from 'react';
import { usePaymentForm } from './usePaymentForm';
import PaymentMethod from './PaymentMethod';
import PaymentSummary from './PaymentSummary';
import PaymentError from './PaymentError';
import PaymentButton from './PaymentButton';

interface PaymentFormProps {
  orderId: string;
  amount: string;
  onSuccess: (transactionHash: string) => void;
  onCancel: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  orderId,
  amount,
  onSuccess,
  onCancel
}) => {
  const {
    selectedMethod,
    walletAddress,
    error,
    loading,
    handleMethodChange,
    handleWalletChange,
    handleSubmit
  } = usePaymentForm({ orderId, amount, onSuccess });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentSummary amount={amount} />
      
      <PaymentMethod
        selectedMethod={selectedMethod}
        walletAddress={walletAddress}
        onMethodChange={handleMethodChange}
        onWalletChange={handleWalletChange}
      />

      {error && <PaymentError message={error} />}

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <PaymentButton loading={loading} />
      </div>
    </form>
  );
};

export default PaymentForm;