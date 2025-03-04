const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connecton successfull');
  } catch (error) {
    console.error('MongoDB connecton failed:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
