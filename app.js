// app.js
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

// Initialize Express
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
  })
);

// Set global variables
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Routes
app.use('/', require('./routes/users'));
app.use('/campaigns', require('./routes/campaigns'));
app.use('/donations', require('./routes/donations'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
