import Leave from "../models/Leave.js";

/**
 * Apply for leave (Employee)
 * @route POST /leave/apply
 */
export const applyLeave = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const { leaveType, startDate, endDate, reason } = req.body;

    // Validate required fields
    if (!leaveType || !startDate || !endDate) {
      return res.status(400).json({ error: "Leave type, start date, and end date are required" });
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      return res.status(400).json({ error: "End date must be after start date" });
    }

    // Create leave request
    const leave = await Leave.create({
      employeeId,
      leaveType,
      startDate: start,
      endDate: end,
      reason: reason || "",
      status: "Pending"
    });

    const populatedLeave = await Leave.findById(leave._id)
      .populate('employeeId', 'firstName lastName email employeeId');

    res.status(201).json({
      message: "Leave request submitted successfully",
      leave: populatedLeave
    });
  } catch (error) {
    console.error("Apply leave error:", error);
    res.status(500).json({ error: "Server error applying for leave" });
  }
};

/**
 * Get employee's own leave requests
 * @route GET /leave/my
 */
export const getMyLeaves = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const { status } = req.query;

    const query = { employeeId };
    if (status) {
      query.status = status;
    }

    const leaves = await Leave.find(query)
      .sort({ createdAt: -1 })
      .limit(100);

    res.json(leaves);
  } catch (error) {
    console.error("Get my leaves error:", error);
    res.status(500).json({ error: "Server error fetching leave requests" });
  }
};

/**
 * Get all leave requests (Admin)
 * @route GET /leave/all
 */
export const getAllLeaves = async (req, res) => {
  try {
    const { status, employeeId } = req.query;

    const query = {};
    if (status) query.status = status;
    if (employeeId) query.employeeId = employeeId;

    const leaves = await Leave.find(query)
      .populate('employeeId', 'firstName lastName email employeeId')
      .sort({ createdAt: -1 })
      .limit(500);

    res.json(leaves);
  } catch (error) {
    console.error("Get all leaves error:", error);
    res.status(500).json({ error: "Server error fetching leave requests" });
  }
};

/**
 * Update leave status (Admin)
 * @route PUT /leave/:id/status
 */
export const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminComment } = req.body;

    // Validate status
    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status. Must be Pending, Approved, or Rejected" });
    }

    const leave = await Leave.findByIdAndUpdate(
      id,
      {
        status,
        adminComment: adminComment || ""
      },
      { new: true }
    ).populate('employeeId', 'firstName lastName email employeeId');

    if (!leave) {
      return res.status(404).json({ error: "Leave request not found" });
    }

    res.json({
      message: `Leave request ${status.toLowerCase()} successfully`,
      leave
    });
  } catch (error) {
    console.error("Update leave status error:", error);
    res.status(500).json({ error: "Server error updating leave status" });
  }
};

/**
 * Get leave balance (simplified - returns fixed values)
 * In production, this would calculate based on company policy
 * @route GET /leave/balance
 */
export const getLeaveBalance = async (req, res) => {
  try {
    const employeeId = req.user.id;

    // Get all approved leaves for current year
    const currentYear = new Date().getFullYear();
    const yearStart = new Date(currentYear, 0, 1);
    const yearEnd = new Date(currentYear, 11, 31);

    const approvedLeaves = await Leave.find({
      employeeId,
      status: "Approved",
      startDate: { $gte: yearStart, $lte: yearEnd }
    });

    // Calculate used days
    let paidLeaveDays = 0;
    let sickLeaveDays = 0;
    let unpaidLeaveDays = 0;

    approvedLeaves.forEach(leave => {
      const days = Math.ceil((leave.endDate - leave.startDate) / (1000 * 60 * 60 * 24)) + 1;

      if (leave.leaveType === "Paid Leave") {
        paidLeaveDays += days;
      } else if (leave.leaveType === "Sick Leave") {
        sickLeaveDays += days;
      } else if (leave.leaveType === "Unpaid Leave") {
        unpaidLeaveDays += days;
      }
    });

    // Company policy: 24 paid, 10 sick, 5 unpaid per year
    res.json({
      paidLeave: {
        total: 24,
        used: paidLeaveDays,
        remaining: 24 - paidLeaveDays
      },
      sickLeave: {
        total: 10,
        used: sickLeaveDays,
        remaining: 10 - sickLeaveDays
      },
      unpaidLeave: {
        total: 5,
        used: unpaidLeaveDays,
        remaining: 5 - unpaidLeaveDays
      }
    });
  } catch (error) {
    console.error("Get leave balance error:", error);
    res.status(500).json({ error: "Server error fetching leave balance" });
  }
};
