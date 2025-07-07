// Load environment variables
const dotenv = require('dotenv');
dotenv.config();

// Core modules
const express = require('express');
const cors = require('cors');

// DB config
const connectDB = require('./config/db');

// Route handlers
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors());         // Enable CORS for frontend/backend communication

// Test route
app.get('/', (req, res) => {
  res.send('☕ BlogBrew backend is live!');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/user', userRoutes);

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});