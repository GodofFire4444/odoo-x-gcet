import Leave from "../models/Leave.js";

export const applyLeave = async(req,res)=>{
  try {
    const { leaveType, startDate, endDate, reason } = req.body;
    const leave = await Leave.create({
      employeeId: req.user.id,
      leaveType,
      startDate,
      endDate,
      reason
    });
    res.json(leave);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMyLeaves = async(req,res)=>{
  try {
    const leaves = await Leave.find({ employeeId: req.user.id }).sort({ createdAt: -1 });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllLeaves = async(req,res)=>{
  try {
    const leaves = await Leave.find()
      .populate('employeeId', 'firstName lastName email employeeId')
      .sort({ createdAt: -1 });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateLeaveStatus = async(req,res)=>{
  try {
    const { id } = req.params;
    const { status, adminComment } = req.body;
    const leave = await Leave.findByIdAndUpdate(id, { status, adminComment }, { new: true });
    res.json(leave);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
