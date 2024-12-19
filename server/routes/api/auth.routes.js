const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const {
  register,
  login,
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPassword,
  getCurrentUser,
  updateProfile
} = require('../../controllers/auth.controller');

// Validation middleware
const registerValidation = [
  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Invalid email address'),
  body('password').exists().withMessage('Password is required')
];

const passwordValidation = [
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const emailValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Invalid email address')
];

// Public routes
router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.get('/verify-email/:token', verifyEmail);
router.post('/resend-verification', emailValidation, validate, resendVerification);
router.post('/forgot-password', emailValidation, validate, forgotPassword);
router.post('/reset-password/:token', passwordValidation, validate, resetPassword);

// Protected routes
router.get('/me', auth, getCurrentUser);
router.put('/profile', auth, [
  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Invalid email address')
], validate, updateProfile);

module.exports = router;