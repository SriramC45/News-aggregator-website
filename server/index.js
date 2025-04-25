const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Authentication routes
const newsRoutes = require('./routes/news'); // News routes

dotenv.config(); // Load environment variables
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the server if DB connection fails
  });
// Use authentication and news routes
app.use('/api/auth', authRoutes); // Authentication routes (login, register, etc.)
app.use('/api', newsRoutes); // News routes

// Set server port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
