import express from "express";
import { auth } from "../middleware/auth.js";
import { employeeOnly, adminOnly } from "../middleware/roles.js";
import { checkIn, checkOut, getAllAttendance } from "../controllers/attendence.js";

const router = express.Router();

router.post("/checkin", auth, employeeOnly, checkIn);
router.post("/checkout", auth, employeeOnly, checkOut);
router.get("/all", auth, adminOnly, getAllAttendance);

export default router;
