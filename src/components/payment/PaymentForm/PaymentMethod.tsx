import React from 'react';
import { PaymentMethod as PaymentMethodType } from '../../../types/payment';
import FormInput from '../../common/FormInput';

interface PaymentMethodProps {
  selectedMethod: PaymentMethodType;
  walletAddress: string;
  onMethodChange: (method: PaymentMethodType) => void;
  onWalletChange: (address: string) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  selectedMethod,
  walletAddress,
  onMethodChange,
  onWalletChange
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Payment Method</label>
        <div className="mt-2 space-y-2">
          <div className="flex items-center">
            <input
              id="usdc"
              name="paymentMethod"
              type="radio"
              checked={selectedMethod === 'usdc'}
              onChange={() => onMethodChange('usdc')}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
            />
            <label htmlFor="usdc" className="ml-3 block text-sm font-medium text-gray-700">
              USDC
            </label>
          </div>
        </div>
      </div>

      <FormInput
        label="Wallet Address"
        id="walletAddress"
        name="walletAddress"
        type="text"
        value={walletAddress}
        onChange={(e) => onWalletChange(e.target.value)}
        placeholder="Enter your wallet address (0x...)"
        required
      />
    </div>
  );
};

export default PaymentMethod;