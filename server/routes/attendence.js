import express from "express";
import { auth } from "../middleware/auth.js";
import { employeeOnly } from "../middleware/roles.js";
import { checkIn, checkOut } from "../controllers/attendence.js";

const router = express.Router();

router.post("/checkin", auth, employeeOnly, checkIn);
router.post("/checkout", auth, employeeOnly, checkOut);

export default router;
