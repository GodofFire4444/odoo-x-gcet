import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.set('strictQuery', false);

const DEFAULT_URI = "mongodb://127.0.0.1:27017/hrms";

export const connectDB = async (opts = {}) => {
  const uri = process.env.MONGO_URI || DEFAULT_URI;
  const maxRetries = opts.retries ?? 5;
  const retryDelay = opts.retryDelay ?? 3000;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await mongoose.connect(uri, { /* options left empty for mongoose v6+ */ });
      console.log("DB Connected to", uri);
      return;
    } catch (err) {
      console.error(`Mongo connection attempt ${attempt} failed:`,
        err && err.message ? err.message : err);

      if (attempt === maxRetries) {
        console.error(`All ${maxRetries} connection attempts failed.`);
        // Do not exit immediately; propagate error so caller can decide
        throw err;
      }

      await new Promise((res) => setTimeout(res, retryDelay));
      console.log(`Retrying Mongo connection (attempt ${attempt + 1}/${maxRetries})...`);
    }
  }
};
