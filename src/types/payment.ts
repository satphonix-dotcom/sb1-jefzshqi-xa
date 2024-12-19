export type PaymentMethod = 'usdc';

export interface PaymentDetails {
  amount: string;
  currency: PaymentMethod;
  walletAddress: string;
}

export interface PaymentState {
  loading: boolean;
  error: string | null;
  transactionHash: string | null;
  status: PaymentStatus | null;
}

export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface PaymentResponse {
  status: PaymentStatus;
  transactionHash?: string;
  message?: string;
}