import mongoose from 'mongoose';
import { config } from './env'; 

export const connectDB  = async () => {
  try {
    await mongoose.connect(config.database_url!);
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};