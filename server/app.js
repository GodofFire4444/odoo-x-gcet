import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./Config/db.js";

import authRoutes from "./Routes/auth.js";
import employeeRoutes from "./Routes/employee.js";
import attendanceRoutes from "./Routes/attendance.js";
import payrollRoutes from "./Routes/payroll.js";

import adminRoutes from "./Routes/admin.js";
import leaveRoutes from "./Routes/leave.js";

dotenv.config();
// establish DB connection; exit if unable to connect
connectDB().catch((err) => {
	console.error("Failed to connect to MongoDB:", err && err.message ? err.message : err);
	process.exit(1);
});

const app = express();
app.use(cors());
app.use(express.json());
// support form submissions (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/employee", employeeRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/payroll", payrollRoutes);
app.use("/leave", leaveRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
