const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
// const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
const port = 3000;
console.log('MongoDB URI:', process.env.MONGODB_URI);


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));


// Middleware to parse JSON
app.use(express.json());

// Middleware
app.use(bodyParser.json());

// Import routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

// Use routes
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
