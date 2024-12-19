const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');
const {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getVendorProducts,
  searchProducts
} = require('../../controllers/product.controller');

// Public routes
router.get('/', listProducts);
router.get('/search', searchProducts);
router.get('/:id', getProduct);

// Protected routes
router.use(auth);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/vendor/products', getVendorProducts);

// Admin routes
router.use(admin);
router.get('/admin/all', listProducts);
router.put('/admin/status/:id', updateProduct);

module.exports = router;