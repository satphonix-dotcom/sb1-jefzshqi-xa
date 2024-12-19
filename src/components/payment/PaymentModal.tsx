```typescript
import React, { useState, useEffect } from 'react';
import { useWallet } from '../../hooks/useWallet';
import paymentService from '../../services/payment.service';
import { formatPrice } from '../../utils/formatters';

interface PaymentModalProps {
  orderId: string;
  amount: string;
  onSuccess: (transactionHash: string) => void;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  orderId,
  amount,
  onSuccess,
  onClose
}) => {
  const { address, loading: walletLoading, error: walletError, connect } = useWallet();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    const checkBalance = async () => {
      if (address) {
        try {
          const balance = await paymentService.getBalance(address);
          setBalance(balance);
        } catch (error) {
          setError('Failed to fetch balance');
        }
      }
    };

    checkBalance();
  }, [address]);

  const handlePayment = async () => {
    if (!address) {
      setError('Please connect your wallet first');
      return;
    }

    try {
      setProcessing(true);
      setError(null);
      const transactionHash = await paymentService.processPayment(orderId, amount);
      onSuccess(transactionHash);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Complete Payment</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-sm text-gray-600">Amount to Pay</p>
            <p className="text-2xl font-bold">{formatPrice(amount)} USDC</p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {!address ? (
            <button
              onClick={connect}
              disabled={walletLoading}
              className="w-full bg-yellow-400 text-gray-900 py-3 px-6 rounded-md hover:bg-yellow-500 disabled:opacity-50"
            >
              {walletLoading ? 'Connecting...' : 'Connect Wallet'}
            </button>
          ) : (
            <>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-sm text-gray-600">Connected Wallet</p>
                <p className="text-sm font-mono">{address}</p>
                {balance && (
                  <p className="text-sm text-gray-600 mt-2">
                    Balance: {balance} USDC
                  </p>
                )}
              </div>

              <button
                onClick={handlePayment}
                disabled={processing}
                className="w-full bg-yellow-400 text-gray-900 py-3 px-6 rounded-md hover:bg-yellow-500 disabled:opacity-50"
              >
                {processing ? 'Processing...' : 'Pay Now'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
```