import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({

  employeeId: { type: mongoose.Types.ObjectId, ref: "Employee" },

  date: Date,
  checkIn: Date,
  checkOut: Date,
  totalHours: Number

}, { timestamps: true });

attendanceSchema.index({ employeeId: 1, date: 1 });

export default mongoose.model("Attendance", attendanceSchema);
