import { ethers } from 'ethers';

export const connectWallet = async () => {
  if (!window.ethereum) {
    throw new Error('No crypto wallet found');
  }

  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return signer;
};

export const verifyUSDCPayment = async (transactionHash, amount, contractAddress) => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const receipt = await provider.getTransactionReceipt(transactionHash);
  return receipt && receipt.status === 1;
};