const mongoose = require('mongoose');

const vendorProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  businessName: {
    type: String,
    required: true,
    trim: true
  },
  businessAddress: {
    type: String,
    required: true,
    trim: true
  },
  taxId: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  approvedAt: {
    type: Date
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalSales: {
    type: Number,
    default: 0
  },
  commission: {
    type: Number,
    default: 10, // 10% commission
    min: 0,
    max: 100
  },
  paymentDetails: {
    walletAddress: {
      type: String,
      trim: true
    },
    preferredCurrency: {
      type: String,
      default: 'USDC'
    }
  }
}, {
  timestamps: true
});

// Add indexes
vendorProfileSchema.index({ user: 1 });
vendorProfileSchema.index({ status: 1 });
vendorProfileSchema.index({ businessName: 'text' });

module.exports = mongoose.model('VendorProfile', vendorProfileSchema);