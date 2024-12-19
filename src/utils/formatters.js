import { format } from 'date-fns';

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
};

export const formatDate = (date) => {
  return format(new Date(date), 'PPP');
};

export const formatWalletAddress = (address) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};