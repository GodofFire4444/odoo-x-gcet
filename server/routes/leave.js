import express from "express";
import { applyLeave, getMyLeaves, getAllLeaves, updateLeaveStatus, getLeaveBalance } from "../controllers/leave.js";
import { protect } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/roles.js";

const router = express.Router();

// All leave routes require authentication
router.use(protect);

// Employee routes
router.post("/apply", applyLeave);
router.get("/my", getMyLeaves);
router.get("/balance", getLeaveBalance);

// Admin routes
router.get("/all", requireAdmin, getAllLeaves);
router.put("/:id/status", requireAdmin, updateLeaveStatus);

export default router;
