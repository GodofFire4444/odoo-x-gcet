import express from "express";
import { auth } from "../middleware/auth.js";
import { adminOnly, employeeOnly } from "../middleware/roles.js";
import { applyLeave, getMyLeaves, getAllLeaves, updateLeaveStatus } from "../controllers/leave.js";

const router = express.Router();

// Employee Routes
router.post("/apply", auth, employeeOnly, applyLeave);
router.get("/me", auth, employeeOnly, getMyLeaves);

// Admin Routes
router.get("/all", auth, adminOnly, getAllLeaves);
router.put("/:id/status", auth, adminOnly, updateLeaveStatus);

export default router;
