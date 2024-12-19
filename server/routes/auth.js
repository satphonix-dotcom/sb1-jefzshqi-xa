// Add this route after other routes
router.post('/create-test-user', async (req, res) => {
  try {
    const { role } = req.body;
    
    // Create test user with specified role
    const user = new User({
      username: `test_${role}_${Date.now()}`,
      email: `test_${role}_${Date.now()}@test.com`,
      password: 'Test123!',
      role: role || 'customer',
      isVerified: true
    });

    await user.save();

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
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
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});