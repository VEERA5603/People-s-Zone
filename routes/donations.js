// routes/donations.js
const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Campaign = require('../models/Campaign');
const Donation = require('../models/Donation');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Authentication middleware
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  res.redirect('/login');
};

// GET checkout page
router.get('/checkout/:campaignId', isAuthenticated, async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.campaignId);
    if (!campaign) {
      return res.status(404).send('Campaign not found');
    }
    
    res.render('donations/checkout', { campaign });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Create order for payment
router.post('/create-order', isAuthenticated, async (req, res) => {
  try {
    const { amount, campaignId } = req.body;
    
    const options = {
      amount: amount * 100, // Razorpay amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`
    };
    
    const order = await razorpay.orders.create(options);
    
    res.json({
      orderId: order.id,
      amount: amount * 100,
      currency: 'INR',
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Verify payment and save donation
router.post('/verify', isAuthenticated, async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, amount, campaignId } = req.body;
    
    // Verify signature
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');
    
    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ error: 'Invalid payment signature' });
    }
    
    // Create donation record
    const donation = await Donation.create({
      amount: amount / 100, // Convert back from paise to rupees
      donor: req.session.user.id,
      campaign: campaignId,
      paymentId: razorpay_payment_id,
      status: 'completed'
    });
    
    // Update campaign amount raised
    await Campaign.findByIdAndUpdate(campaignId, {
      $inc: { amountRaised: amount / 100 }
    });
    
    res.json({ success: true, campaignId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Payment verification failed' });
  }
});

module.exports = router;