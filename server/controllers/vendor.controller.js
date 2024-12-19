const User = require('../models/User');
const VendorProfile = require('../models/VendorProfile');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { USER_ROLES } = require('../constants');

const registerVendor = async (req, res) => {
  try {
    const userId = req.user.userId;
    const {
      businessName,
      businessAddress,
      taxId,
      phoneNumber,
      website,
      description
    } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === USER_ROLES.VENDOR) {
      return res.status(400).json({ message: 'User is already a vendor' });
    }

    // Create vendor profile
    const vendorProfile = new VendorProfile({
      user: userId,
      businessName,
      businessAddress,
      taxId,
      phoneNumber,
      website,
      description
    });

    await vendorProfile.save();

    // Update user role
    user.role = USER_ROLES.VENDOR;
    await user.save();

    res.json({
      message: 'Vendor registration successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        vendorProfile
      }
    });
  } catch (error) {
    console.error('Vendor registration error:', error);
    res.status(500).json({ message: 'Server error during vendor registration' });
  }
};

const getVendorStats = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get vendor profile
    const vendorProfile = await VendorProfile.findOne({ user: userId });
    if (!vendorProfile) {
      return res.status(404).json({ message: 'Vendor profile not found' });
    }

    // Get active products count
    const activeProducts = await Product.countDocuments({
      seller: userId,
      status: 'active'
    });

    // Get pending orders count
    const pendingOrders = await Order.countDocuments({
      'items.vendor': userId,
      status: 'pending'
    });

    // Calculate total sales
    const orders = await Order.find({
      'items.vendor': userId,
      status: { $in: ['completed', 'delivered'] }
    });

    const totalSales = orders.reduce((sum, order) => {
      const vendorItems = order.items.filter(item => 
        item.vendor.toString() === userId.toString()
      );
      return sum + vendorItems.reduce((itemSum, item) => 
        itemSum + (item.price * item.quantity), 0
      );
    }, 0);

    res.json({
      totalSales,
      activeProducts,
      pendingOrders,
      averageRating: vendorProfile.rating,
      totalOrders: orders.length
    });
  } catch (error) {
    console.error('Get vendor stats error:', error);
    res.status(500).json({ message: 'Failed to fetch vendor statistics' });
  }
};

const updateVendorSettings = async (req, res) => {
  try {
    const userId = req.user.userId;
    const {
      businessName,
      businessAddress,
      phoneNumber,
      website,
      description,
      paymentDetails
    } = req.body;

    const vendorProfile = await VendorProfile.findOne({ user: userId });
    if (!vendorProfile) {
      return res.status(404).json({ message: 'Vendor profile not found' });
    }

    // Update fields if provided
    if (businessName) vendorProfile.businessName = businessName;
    if (businessAddress) vendorProfile.businessAddress = businessAddress;
    if (phoneNumber) vendorProfile.phoneNumber = phoneNumber;
    if (website) vendorProfile.website = website;
    if (description) vendorProfile.description = description;
    if (paymentDetails) vendorProfile.paymentDetails = paymentDetails;

    await vendorProfile.save();

    res.json({
      message: 'Vendor settings updated successfully',
      vendorProfile
    });
  } catch (error) {
    console.error('Update vendor settings error:', error);
    res.status(500).json({ message: 'Failed to update vendor settings' });
  }
};

module.exports = {
  registerVendor,
  getVendorStats,
  updateVendorSettings
};