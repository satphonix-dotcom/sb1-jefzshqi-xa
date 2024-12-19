export const USER_ROLES = {
  ADMIN: 'admin',
  VENDOR: 'vendor',
  CUSTOMER: 'customer'
};

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed'
};

export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Fashion',
  'Jewelry',
  'Watches',
  'Accessories',
  'Art',
  'Home & Decor',
  'Automotive'
];

export const SUPPORTED_FILE_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp']
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    VERIFY_EMAIL: '/auth/verify-email',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password'
  },
  PRODUCTS: {
    LIST: '/products',
    CREATE: '/products',
    UPDATE: (id) => `/products/${id}`,
    DELETE: (id) => `/products/${id}`,
    VENDOR: '/products/vendor'
  },
  ORDERS: {
    CREATE: '/orders',
    LIST: '/orders',
    DETAILS: (id) => `/orders/${id}`,
    UPDATE_STATUS: (id) => `/orders/${id}/status`
  },
  PAYMENTS: {
    PROCESS: '/payments/process',
    STATUS: (orderId) => `/payments/${orderId}/status`
  }
};