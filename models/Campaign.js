// models/Campaign.js
const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  goal: {
    type: Number,
    required: true
  },
  amountRaised: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    default: 'default-campaign.jpg'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Campaign', CampaignSchema);
