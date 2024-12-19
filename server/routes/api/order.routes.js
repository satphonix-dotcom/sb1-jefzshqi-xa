const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {
  createOrder,
  getUserOrders,
  getVendorOrders,
  getOrder,
  updateOrderStatus,
  cancelOrder
} = require('../../controllers/order.controller');

router.use(auth);

router.post('/', createOrder);
router.get('/user', getUserOrders);
router.get('/vendor', getVendorOrders);
router.get('/:id', getOrder);
router.patch('/:id/status', updateOrderStatus);
router.patch('/:id/cancel', cancelOrder);

module.exports = router;