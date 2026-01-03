import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  companyName: String,
  email: { type: String, unique: true },
  phone: String,
  password: String
}, { timestamps: true });

export default mongoose.model("Admin", adminSchema);
