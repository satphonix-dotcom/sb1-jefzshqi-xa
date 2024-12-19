import { useState } from 'react';
import { useAppDispatch } from '../../../hooks';
import { processPayment } from '../../../store/slices/paymentSlice';
import { PaymentMethod } from '../../../types/payment';
import { validateWalletAddress } from '../../../utils/validation';

interface UsePaymentFormProps {
  orderId: string;
  amount: string;
  onSuccess: (transactionHash: string) => void;
}

export const usePaymentForm = ({ orderId, amount, onSuccess }: UsePaymentFormProps) => {
  const dispatch = useAppDispatch();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('usdc');
  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleMethodChange = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setError(null);
  };

  const handleWalletChange = (address: string) => {
    setWalletAddress(address);
    setError(null);
  };

  const validateForm = (): boolean => {
    if (!validateWalletAddress(walletAddress)) {
      setError('Invalid wallet address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await dispatch(processPayment({
        orderId,
        paymentDetails: {
          amount,
          currency: selectedMethod,
          walletAddress
        }
      })).unwrap();

      if (result.transactionHash) {
        onSuccess(result.transactionHash);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return {
    selectedMethod,
    walletAddress,
    error,
    loading,
    handleMethodChange,
    handleWalletChange,
    handleSubmit
  };
};