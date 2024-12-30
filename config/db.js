


const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoURI = 'mongodb+srv://fitstyle:123@fitstyle.5plqw.mongodb.net/?retryWrites=true&w=majority&appName=fitstyle';  // Get the URI from environment variables
    await mongoose.connect(mongoURI);  // No need to pass useNewUrlParser and useUnifiedTopology options
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
