import express from "express";
import { auth } from "../middleware/auth.js";
import { adminOnly, employeeOnly } from "../middleware/roles.js";
import { createPayroll, getMyPayroll, getAllPayrolls } from "../controllers/payroll.js";

const router = express.Router();

router.post("/create", auth, adminOnly, createPayroll);
router.get("/all", auth, adminOnly, getAllPayrolls);
router.get("/me", auth, employeeOnly, getMyPayroll);

export default router;
