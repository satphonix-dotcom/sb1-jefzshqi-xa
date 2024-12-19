import React from 'react';
import { formatPrice } from '../../../utils/formatters';

interface PaymentSummaryProps {
  amount: string;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({ amount }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Amount to Pay</span>
        <span className="text-2xl font-bold">{formatPrice(amount)} USDC</span>
      </div>
      <p className="mt-2 text-sm text-gray-500">
        Payment will be processed using the USDC smart contract
      </p>
    </div>
  );
};

export default PaymentSummary;