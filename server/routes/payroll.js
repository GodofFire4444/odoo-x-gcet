import express from "express";
import { getMyPayroll, getAllPayrolls, createPayroll, updatePayroll, deletePayroll } from "../controllers/payroll.js";
import { protect } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/roles.js";

const router = express.Router();

// All payroll routes require authentication
router.use(protect);

// Employee routes
router.get("/my", getMyPayroll);

// Admin routes
router.get("/all", requireAdmin, getAllPayrolls);
router.post("/", requireAdmin, createPayroll);
router.put("/:id", requireAdmin, updatePayroll);
router.delete("/:id", requireAdmin, deletePayroll);

export default router;
