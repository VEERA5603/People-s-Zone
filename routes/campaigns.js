// routes/campaigns.js
const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');
const Donation = require('../models/Donation');

// Authentication middleware
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  res.redirect('/login');
};

// GET all campaigns
router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 }).populate('creator', 'name');
    res.render('campaigns/list', { campaigns });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// GET create campaign page
router.get('/create', isAuthenticated, (req, res) => {
  res.render('campaigns/create');
});

// POST create campaign
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const { title, description, goal, endDate } = req.body;
    
    await Campaign.create({
      title,
      description,
      goal,
      endDate,
      creator: req.session.user.id
    });
    
    res.redirect('/campaigns');
  } catch (error) {
    console.error(error);
    res.render('campaigns/create', { error: 'Failed to create campaign' });
  }
});

// GET campaign by ID
router.get('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id).populate('creator', 'name');
    if (!campaign) {
      return res.status(404).send('Campaign not found');
    }
    
    const donations = await Donation.find({
      campaign: campaign._id,
      status: 'completed'
    }).populate('donor', 'name');
    
    res.render('campaigns/details', { campaign, donations });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

