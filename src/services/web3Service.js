import Web3 from 'web3';
import { ethers } from 'ethers';

// USDC Contract ABI (minimal for transfers)
const USDC_ABI = [
  "function transfer(address to, uint256 value) returns (bool)",
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)"
];

// USDC Contract addresses (add more networks as needed)
const USDC_ADDRESSES = {
  ethereum: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  polygon: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
};

class Web3Service {
  constructor() {
    this.web3 = null;
    this.provider = null;
    this.signer = null;
    this.usdcContract = null;
  }

  async initialize() {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('Please install MetaMask or another Web3 wallet');
    }

    this.provider = new ethers.BrowserProvider(window.ethereum);
    this.signer = await this.provider.getSigner();
    this.web3 = new Web3(window.ethereum);
  }

  async connectWallet() {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      await this.initialize();
      return true;
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  }

  async getUSDCContract(network = 'polygon') {
    if (!this.signer) await this.initialize();
    
    return new ethers.Contract(
      USDC_ADDRESSES[network],
      USDC_ABI,
      this.signer
    );
  }

  async getUSDCBalance(address, network = 'polygon') {
    const contract = await this.getUSDCContract(network);
    const decimals = await contract.decimals();
    const balance = await contract.balanceOf(address);
    return ethers.formatUnits(balance, decimals);
  }

  async sendUSDCPayment(toAddress, amount, network = 'polygon') {
    const contract = await this.getUSDCContract(network);
    const decimals = await contract.decimals();
    const value = ethers.parseUnits(amount.toString(), decimals);

    try {
      const tx = await contract.transfer(toAddress, value);
      const receipt = await tx.wait();
      return {
        success: true,
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber
      };
    } catch (error) {
      console.error('Payment failed:', error);
      throw error;
    }
  }

  async verifyPayment(transactionHash, network = 'polygon') {
    try {
      const receipt = await this.provider.getTransactionReceipt(transactionHash);
      return {
        confirmed: receipt !== null,
        blockNumber: receipt?.blockNumber,
        status: receipt?.status === 1
      };
    } catch (error) {
      console.error('Failed to verify payment:', error);
      throw error;
    }
  }
}

export default new Web3Service();