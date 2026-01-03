import express from "express";
import { checkIn, checkOut, getAllAttendance, getMyAttendance, getTodayAttendance } from "../controllers/attendance.js";
import { protect } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/roles.js";

const router = express.Router();

// All attendance routes require authentication
router.use(protect);

// Employee routes
router.post("/checkin", checkIn);
router.post("/checkout", checkOut);
router.get("/my", getMyAttendance);
router.get("/today", getTodayAttendance);

// Admin routes
router.get("/all", requireAdmin, getAllAttendance);

export default router;
