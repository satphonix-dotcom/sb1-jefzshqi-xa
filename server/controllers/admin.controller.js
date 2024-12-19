```javascript
const User = require('../models/User');
const VendorProfile = require('../models/VendorProfile');
const Product = require('../models/Product');
const Order = require('../models/Order');

const getAdminStats = async (req, res) => {
  try {
    const [
      activeUsers,
      activeVendors,
      totalProducts,
      completedOrders
    ] = await Promise.all([
      User.countDocuments({ status: 'active' }),
      User.countDocuments({ role: 'vendor', status: 'active' }),
      Product.countDocuments({ status: 'active' }),
      Order.find({ status: 'completed' })
    ]);

    const totalRevenue = completedOrders.reduce((sum, order) => sum + order.total, 0);

    res.json({
      totalRevenue,
      activeUsers,
      activeVendors,
      totalProducts
    });
  } catch (error) {
    console.error('Get admin stats error:', error);
    res.status(500).json({ message: 'Failed to fetch admin statistics' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });
    
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === 'admin') {
      return res.status(403).json({ message: 'Cannot modify admin status' });
    }

    user.status = status;
    await user.save();

    res.json(user);
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({ message: 'Failed to update user status' });
  }
};

module.exports = {
  getAdminStats,
  getUsers,
  updateUserStatus
};
```