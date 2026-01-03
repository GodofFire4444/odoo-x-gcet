import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: String,
  companyName: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
  role: { type: String, default: "ADMIN" },
  emailVerified: { type: Boolean, default: false },
  emailVerificationToken: String
}, { timestamps: true });

export default mongoose.model("Admin", adminSchema);
