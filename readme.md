# ![Community Fundraising Platform](https://imgs.search.brave.com/75vJiNPqD8euxEnFX-DrHTjyAcJB1GRNkVvvNhVHDj8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvNTAwcC8w/MC82NC9kb25hdGlv/bi1jYXJkYm9hcmQt/Ym94ZXMtd2l0aC1j/bG90aGVzLWZvb2Qt/d2Vhci12ZWN0b3It/Mzk4NTAwNjQuanBn)

# Community Fundraising Platform

A simple yet powerful platform that allows people to create and contribute to local community initiatives and charitable causes. Built with Express.js, MongoDB Atlas, and Razorpay payment gateway.

## Features

- 👤 **User Authentication**: Secure registration and login system
- 📝 **Campaign Management**: Create, view, and manage fundraising campaigns
- 💰 **Donation System**: Seamless payment processing with Razorpay
- 📊 **Progress Tracking**: Real-time campaign funding progress
- 📱 **Responsive Design**: Works on mobile, tablet, and desktop

## Tech Stack

- **Backend**: ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
- **Database**: ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
- **Payment Gateway**: ![Razorpay](https://img.shields.io/badge/Razorpay-02042B?style=for-the-badge&logo=razorpay&logoColor=white)
- **Frontend**: ![EJS](https://img.shields.io/badge/EJS-8A2BE2?style=for-the-badge&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
- **Authentication**: Session-based with express-session
- **Password Security**: bcryptjs for hashing

## Prerequisites

- Node.js (v14+ recommended)
- MongoDB Atlas account
- Razorpay account

## Installation

1. Clone the repository

git clone https://github.com/VEERA5603/People-s-Zone.git
cd People-s-Zone


2. Install dependencies

npm install


3. Create a `.env` file in the root directory with the following variables:

PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/fundraising
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
SESSION_SECRET=your_session_secret


4. Start the development server

npm run dev


5. Access the application at `http://localhost:3000`

## Project Structure


community-fundraising-platform/
├── config/
│   └── db.js             # Database connection configuration
├── models/
│   ├── Campaign.js       # Campaign schema
│   ├── Donation.js       # Donation schema
│   └── User.js           # User schema
├── routes/
│   ├── campaigns.js      # Campaign routes
│   ├── donations.js      # Donation routes
│   └── users.js          # User authentication routes
├── views/
│   ├── campaigns/        # Campaign-related views
│   ├── donations/        # Donation-related views
│   ├── partials/         # Reusable view components
│   └── index.ejs         # Home page
├── public/
│   └── css/              # CSS files
├── .env                  # Environment variables
├── app.js                # Express application setup
└── package.json          # Project dependencies


## MongoDB Atlas Setup

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Set up database access (username and password)
4. Set up network access (allow access from anywhere or your specific IP)
5. Get your connection string and update it in the `.env` file

## Razorpay Setup

1. Create an account at [Razorpay](https://razorpay.com/)
2. Navigate to the Dashboard to get your API Key ID and Secret
3. Update them in the `.env` file
4. For testing, use Razorpay's test mode
   - Test card: 4111 1111 1111 1111
   - Any future expiry date
   - Any CVV

## Using MongoDB Shell (mongosh)

Here are some useful commands for managing your database:


// Connect to your MongoDB Atlas cluster
mongosh "mongodb+srv://<username>:<password>@cluster0.mongodb.net/fundraising"

// Show all collections
show collections

// Find all campaigns
db.campaigns.find()

// Find campaigns with amount raised greater than 5000
db.campaigns.find({ amountRaised: { $gt: 5000 } })

// Find donations for a specific campaign
db.donations.find({ campaign: ObjectId("campaignId") })

// Update a campaign
db.campaigns.updateOne(
  { _id: ObjectId("campaignId") },
  { $set: { title: "Updated Campaign Title" } }
)

// Aggregate total donations by campaign
db.donations.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$campaign", total: { $sum: "$amount" } } }
])


