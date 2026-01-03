import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

import authRoutes from "./Routes/auth.js";
import employeeRoutes from "./Routes/employee.js";
import attendanceRoutes from "./Routes/attendance.js";
import payrollRoutes from "./Routes/payroll.js";

import adminRoutes from "./Routes/admin.js";
import leaveRoutes from "./Routes/leave.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/employee", employeeRoutes);
app.use("/attendance", attendanceRoutes);
app.use("/payroll", payrollRoutes);
app.use("/leave", leaveRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
