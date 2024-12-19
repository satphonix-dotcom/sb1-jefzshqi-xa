```javascript
const USER_ROLES = {
  ADMIN: 'admin',
  VENDOR: 'vendor',
  CUSTOMER: 'customer'
};

const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

const PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed'
};

module.exports = {
  USER_ROLES,
  ORDER_STATUS,
  PAYMENT_STATUS
};
```