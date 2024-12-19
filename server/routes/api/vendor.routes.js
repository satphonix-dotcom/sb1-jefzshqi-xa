const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const {
  registerVendor,
  getVendorStats,
  updateVendorSettings,
  getVendorProducts,
  getVendorOrders
} = require('../../controllers/vendor.controller');

// Validation middleware
const vendorValidation = [
  body('businessName').trim().notEmpty().withMessage('Business name is required'),
  body('businessAddress').trim().notEmpty().withMessage('Business address is required'),
  body('taxId').trim().notEmpty().withMessage('Tax ID is required'),
  body('phoneNumber').trim().notEmpty().withMessage('Phone number is required'),
  body('walletAddress')
    .trim()
    .notEmpty()
    .withMessage('Wallet address is required')
    .matches(/^0x[a-fA-F0-9]{40}$/)
    .withMessage('Invalid wallet address format')
];

// All routes require authentication
router.use(auth);

// Register as vendor
router.post('/register', vendorValidation, validate, registerVendor);

// Get vendor statistics
router.get('/stats', getVendorStats);

// Update vendor settings
router.put('/settings', updateVendorSettings);

// Get vendor's products
router.get('/products', getVendorProducts);

// Get vendor's orders
router.get('/orders', getVendorOrders);

module.exports = router;