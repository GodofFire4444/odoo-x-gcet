import express from "express";
import { auth } from "../middleware/auth.js";
import { adminOnly, employeeOnly } from "../middleware/roles.js";
import { createEmployee, getMyProfile, updateMyProfile } from "../controllers/employee.js";

const router = express.Router();

router.post("/create", auth, adminOnly, createEmployee);

router.get("/me", auth, employeeOnly, getMyProfile);
router.put("/me", auth, employeeOnly, updateMyProfile);

export default router;
