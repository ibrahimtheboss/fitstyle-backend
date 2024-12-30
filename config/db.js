
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://fitstyle:123@fitstyle.5plqw.mongodb.net/?retryWrites=true&w=majority&appName=fitstyle');
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;