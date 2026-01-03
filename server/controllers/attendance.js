import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";

/**
 * Check in for the day
 * @route POST /attendance/checkin
 */
export const checkIn = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if already checked in today
    let record = await Attendance.findOne({ employeeId, date: today });

    if (record) {
      return res.status(400).json({ error: "Already checked in for today" });
    }

    // Create new attendance record
    record = await Attendance.create({
      employeeId,
      date: today,
      checkIn: new Date()
    });

    res.json({
      message: "Checked in successfully",
      attendance: record
    });
  } catch (error) {
    console.error("Check-in error:", error);
    res.status(500).json({ error: "Server error during check-in" });
  }
};

/**
 * Check out for the day
 * @route POST /attendance/checkout
 */
export const checkOut = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find today's attendance record
    let record = await Attendance.findOne({ employeeId, date: today });

    if (!record) {
      return res.status(400).json({ error: "No check-in found for today" });
    }

    if (record.checkOut) {
      return res.status(400).json({ error: "Already checked out for today" });
    }

    // Update with checkout time
    record.checkOut = new Date();

    // Calculate total hours
    if (record.checkIn) {
      const diffMs = record.checkOut - record.checkIn;
      record.totalHours = Number((diffMs / (1000 * 60 * 60)).toFixed(2));
    }

    await record.save();

    res.json({
      message: "Checked out successfully",
      attendance: record
    });
  } catch (error) {
    console.error("Check-out error:", error);
    res.status(500).json({ error: "Server error during check-out" });
  }
};

/**
 * Get employee's own attendance records
 * @route GET /attendance/my
 * @query startDate, endDate (optional)
 */
export const getMyAttendance = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const { startDate, endDate } = req.query;

    const query = { employeeId };

    // Add date range filter if provided
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const attendance = await Attendance.find(query)
      .sort({ date: -1 })
      .limit(100); // Limit to last 100 records

    res.json(attendance);
  } catch (error) {
    console.error("Get my attendance error:", error);
    res.status(500).json({ error: "Server error fetching attendance" });
  }
};

/**
 * Get all attendance records (Admin only)
 * @route GET /attendance/all
 */
export const getAllAttendance = async (req, res) => {
  try {
    const { startDate, endDate, employeeId } = req.query;

    const query = {};

    // Filter by employee if provided
    if (employeeId) {
      query.employeeId = employeeId;
    }

    // Add date range filter if provided
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const attendance = await Attendance.find(query)
      .populate('employeeId', 'firstName lastName email employeeId')
      .sort({ date: -1 })
      .limit(500);

    res.json(attendance);
  } catch (error) {
    console.error("Get all attendance error:", error);
    res.status(500).json({ error: "Server error fetching attendance" });
  }
};

/**
 * Get today's attendance status
 * @route GET /attendance/today
 */
export const getTodayAttendance = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const record = await Attendance.findOne({ employeeId, date: today });

    res.json({
      hasCheckedIn: !!record,
      hasCheckedOut: !!(record && record.checkOut),
      attendance: record || null
    });
  } catch (error) {
    console.error("Get today attendance error:", error);
    res.status(500).json({ error: "Server error fetching today's attendance" });
  }
};
