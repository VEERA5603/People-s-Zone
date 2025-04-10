// models/Donation.js
const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
    required: true
  },
  paymentId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Donation', DonationSchema);