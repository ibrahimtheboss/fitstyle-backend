// const express = require('express');
// const connectDB = require('./config/db');
// const productRoutes = require('./routes/productRoutes');
// const cors = require('cors');
// const path = require('path');
// const serverless = require('serverless-http'); // Import serverless-http for serverless deployment

// const app = express();

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(express.json()); // Parse JSON request bodies
// app.use(cors()); // Allow cross-origin requests
// app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded images

// // Routes
// app.use('/api/products', productRoutes);

// // Export as a serverless function for Vercel (or other serverless platforms)
// if (process.env.NODE_ENV === 'production') {
//   // For serverless environments like Vercel or AWS Lambda
//   module.exports.handler = serverless(app); // Export as a serverless function
// } else {
//   // For local development
//   const PORT = process.env.PORT || 5000;
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// }


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

// Export as a serverless function for Vercel (or other serverless platforms)
if (process.env.NODE_ENV === 'production') {
  // For serverless environments like Vercel or AWS Lambda
  module.exports.handler = serverless(app); // Export as a serverless function
} else {
  // For local development
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
