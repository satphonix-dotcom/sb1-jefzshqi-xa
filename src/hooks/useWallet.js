import { useState, useCallback } from 'react';
import { connectWallet } from '../utils/web3';

export const useWallet = () => {
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const connect = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const signer = await connectWallet();
      const address = await signer.getAddress();
      setAddress(address);
      return address;
    } catch (error) {
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { address, error, loading, connect };
};