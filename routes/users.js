
// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Home page
router.get('/', (req, res) => {
  res.render('index');
});

// User authentication middleware
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  res.redirect('/login');
};

// GET login page
router.get('/login', (req, res) => {
  res.render('login');
});

// POST login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await user.matchPassword(password))) {
      return res.render('login', { error: 'Invalid credentials' });
    }
    
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email
    };
    
    res.redirect('/campaigns');
  } catch (error) {
    console.error(error);
    res.render('login', { error: 'Login failed' });
  }
});

// GET register page
router.get('/register', (req, res) => {
  res.render('register');
});

// POST register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.render('register', { error: 'User already exists' });
    }
    
    // Create new user
    user = await User.create({ name, email, password });
    
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email
    };
    
    res.redirect('/campaigns');
  } catch (error) {
    console.error(error);
    res.render('register', { error: 'Registration failed' });
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;