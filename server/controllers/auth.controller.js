const register = require('./auth/register.controller');
const login = require('./auth/login.controller');
const { verifyEmail, resendVerification } = require('./auth/verification.controller');
const { forgotPassword, resetPassword } = require('./auth/password.controller');
const User = require('../models/User');

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if email is being changed
    if (email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }

    // Check if username is being changed
    if (username !== user.username) {
      const usernameExists = await User.findOne({ username });
      if (usernameExists) {
        return res.status(400).json({ message: 'Username already taken' });
      }
    }

    user.username = username;
    user.email = email;
    await user.save();

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  register,
  login,
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPassword,
  getCurrentUser,
  updateProfile
};