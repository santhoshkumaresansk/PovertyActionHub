import mongoose from 'mongoose';
import config from './config.js';

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI);  // MongoDB Atlas URI from the config
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

export default connectDB;
