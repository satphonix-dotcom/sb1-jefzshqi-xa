```typescript
import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { config } from '../config';

export const useWallet = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(async () => {
    if (!window.ethereum) {
      setError('Please install MetaMask or another Web3 wallet');
      return null;
    }

    try {
      setLoading(true);
      setError(null);

      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setAddress(address);
      return address;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to connect wallet');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
  }, []);

  return { address, loading, error, connect, disconnect };
};
```