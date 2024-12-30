const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');
const path = require('path');
const serverless = require('serverless-http'); // Import serverless-http for serverless deployment

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Allow cross-origin requests
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded images

// Routes
app.use('/api/products', productRoutes);

// Export the app wrapped in serverless-http
module.exports.handler = serverless(app);
