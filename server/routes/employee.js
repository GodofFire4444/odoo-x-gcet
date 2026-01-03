import express from "express";
import { getProfile, updateProfile, updateProfilePicture } from "../controllers/employee.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// All employee routes require authentication
router.use(protect);

// Profile routes
router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.post("/profile/picture", updateProfilePicture);

export default router;
