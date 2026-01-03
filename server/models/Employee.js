import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({

  adminId: { type: mongoose.Types.ObjectId, ref: "Admin" },

  firstName: String,
  lastName: String,
  serialNo: Number,

  employeeId: { type: String, unique: true },

  email: { type: String, unique: true },
  password: String,

  role: { type: String, default: "EMPLOYEE" },

  mustChangePassword: { type: Boolean, default: true },

  attendance: [
    { type: mongoose.Types.ObjectId, ref: "Attendance" }
  ],

  privateInfo: {
    dateOfBirth: Date,
    address: String,
    nationality: String,
    personalEmail: String,
    gender: String,
    maritalStatus: String,
    dateOfJoining: Date
  },

  bankDetails: {
    accountNumber: String,
    bankName: String,
    ifscCode: String,
    panNumber: String,
    uanNumber: String,
    empCode: String
  }

}, { timestamps: true });

export default mongoose.model("Employee", employeeSchema);
