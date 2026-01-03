import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import Admin from '../models/Admin.js';

dotenv.config();

const run = async () => {
  try {
    await connectDB({ retries: 1 });
    const admins = await Admin.find().select('-password');
    console.log('Admins:', admins);
    process.exit(0);
  } catch (err) {
    console.error('Error listing admins:', err && err.message ? err.message : err);
    process.exit(1);
  }
};

run();
