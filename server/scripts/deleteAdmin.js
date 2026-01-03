import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import Admin from '../models/Admin.js';

dotenv.config();

const email = process.argv[2];
if (!email) {
  console.error('Usage: node scripts/deleteAdmin.js <email>');
  process.exit(1);
}

const run = async () => {
  try {
    await connectDB({ retries: 1 });
    const res = await Admin.deleteOne({ email });
    console.log('Delete result:', res);
    process.exit(0);
  } catch (err) {
    console.error('Error deleting admin:', err && err.message ? err.message : err);
    process.exit(1);
  }
};

run();
