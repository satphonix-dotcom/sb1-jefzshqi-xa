const User = require('../../models/User');
const { generateToken } = require('../../utils/token');
const { hashPassword } = require('../../utils/password');
const { sendVerificationEmail } = require('../../services/email.service');
const { createVerificationToken } = require('../../utils/token');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ 
        message: 'User already exists with this email or username' 
      });
    }

    // Create verification token
    const verificationToken = createVerificationToken();

    // Create new user
    user = new User({
      username,
      email,
      password: await hashPassword(password),
      verificationToken,
      verificationTokenExpiry: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    });

    await user.save();

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    // Generate JWT
    const token = generateToken(user);

    res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

module.exports = register;