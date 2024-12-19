const Payment = require('../models/Payment');
const Order = require('../models/Order');
const { ethers } = require('ethers');
const config = require('../config/production');

// USDC Contract configuration
const USDC_ABI = [
  "function transfer(address to, uint256 value) returns (bool)",
  "function balanceOf(address owner) view returns (uint256)"
];

const provider = new ethers.JsonRpcProvider(config.web3.rpcUrl);

const paymentController = {
  async processPayment(req, res) {
    try {
      const { orderId, paymentDetails } = req.body;
      
      // Verify order exists and belongs to user
      const order = await Order.findOne({
        _id: orderId,
        user: req.user.userId,
        paymentStatus: 'pending'
      });

      if (!order) {
        return res.status(404).json({ message: 'Order not found or already paid' });
      }

      // Create payment record
      const payment = new Payment({
        order: orderId,
        user: req.user.userId,
        amount: paymentDetails.amount,
        currency: paymentDetails.currency,
        walletAddress: paymentDetails.walletAddress,
        status: 'processing'
      });

      await payment.save();

      // Update order status
      order.paymentStatus = 'processing';
      await order.save();

      // Verify transaction on blockchain
      const receipt = await provider.getTransactionReceipt(paymentDetails.transactionHash);
      
      if (receipt && receipt.status === 1) {
        payment.status = 'completed';
        payment.transactionHash = paymentDetails.transactionHash;
        await payment.save();

        order.paymentStatus = 'completed';
        await order.save();

        return res.json({
          status: 'completed',
          transactionHash: paymentDetails.transactionHash
        });
      }

      res.json({
        status: 'processing',
        message: 'Payment is being processed'
      });
    } catch (error) {
      console.error('Payment processing error:', error);
      res.status(500).json({ message: 'Payment processing failed' });
    }
  },

  async getPaymentStatus(req, res) {
    try {
      const payment = await Payment.findOne({
        order: req.params.orderId,
        user: req.user.userId
      });

      if (!payment) {
        return res.status(404).json({ message: 'Payment not found' });
      }

      if (payment.status === 'processing' && payment.transactionHash) {
        const receipt = await provider.getTransactionReceipt(payment.transactionHash);
        if (receipt && receipt.status === 1) {
          payment.status = 'completed';
          await payment.save();
        }
      }

      res.json({
        status: payment.status,
        transactionHash: payment.transactionHash
      });
    } catch (error) {
      console.error('Payment status check error:', error);
      res.status(500).json({ message: 'Failed to check payment status' });
    }
  }
};

module.exports = paymentController;