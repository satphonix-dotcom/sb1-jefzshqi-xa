const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {
  processPayment,
  getPaymentStatus
} = require('../../controllers/payment.controller');

router.use(auth);

router.post('/process', processPayment);
router.get('/:orderId/status', getPaymentStatus);

module.exports = router;