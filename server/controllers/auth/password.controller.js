const User = require('../../models/User');
const { hashPassword } = require('../../utils/password');
const { sendPasswordResetEmail } = require('../../services/email.service');
const { createResetToken } = require('../../utils/token');

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = createResetToken();
    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiry = Date.now() + 3600000; // 1 hour
    await user.save();

    await sendPasswordResetEmail(email, resetToken);

    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Server error during password reset request' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    user.password = await hashPassword(password);
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiry = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error during password reset' });
  }
};

module.exports = { forgotPassword, resetPassword };