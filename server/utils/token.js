const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const generateToken = (user) => {
  return jwt.sign(
    { 
      userId: user._id,
      role: user.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

const createVerificationToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

const createResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  createVerificationToken,
  createResetToken,
  verifyToken
};