```typescript
import { ethers } from 'ethers';
import { config } from '../config';
import api from '../utils/api';

const USDC_ABI = [
  'function transfer(address to, uint256 value) returns (bool)',
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)'
];

export class PaymentService {
  private provider: ethers.BrowserProvider;
  private usdcContract: ethers.Contract;

  constructor() {
    if (!window.ethereum) {
      throw new Error('Web3 provider not found');
    }
    this.provider = new ethers.BrowserProvider(window.ethereum);
  }

  async initializeContract() {
    const signer = await this.provider.getSigner();
    this.usdcContract = new ethers.Contract(
      config.web3.contracts.usdc,
      USDC_ABI,
      signer
    );
  }

  async getBalance(address: string): Promise<string> {
    if (!this.usdcContract) await this.initializeContract();
    const decimals = await this.usdcContract.decimals();
    const balance = await this.usdcContract.balanceOf(address);
    return ethers.formatUnits(balance, decimals);
  }

  async processPayment(orderId: string, amount: string): Promise<string> {
    if (!this.usdcContract) await this.initializeContract();

    try {
      // Get merchant address from backend
      const { data: { merchantAddress } } = await api.get(`/payments/${orderId}/merchant`);

      // Convert amount to proper decimals
      const decimals = await this.usdcContract.decimals();
      const value = ethers.parseUnits(amount, decimals);

      // Send USDC transfer transaction
      const tx = await this.usdcContract.transfer(merchantAddress, value);
      const receipt = await tx.wait();

      // Notify backend of successful payment
      await api.post(`/payments/${orderId}/confirm`, {
        transactionHash: receipt.hash
      });

      return receipt.hash;
    } catch (error) {
      throw new Error('Payment failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }

  async verifyPayment(transactionHash: string): Promise<boolean> {
    try {
      const receipt = await this.provider.getTransactionReceipt(transactionHash);
      return receipt !== null && receipt.status === 1;
    } catch (error) {
      return false;
    }
  }
}

export default new PaymentService();
```