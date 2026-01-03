import Payroll from "../models/Payroll.js";

export const createPayroll = async(req,res)=>{
  req.body.adminId = req.user.id;
  const data = await Payroll.create(req.body);
  res.json(data);
};

export const getMyPayroll = async(req,res)=>{
  const data = await Payroll.find({ employeeId:req.user.id }); // Changed findOne to find for history
  res.json(data);
};

export const getAllPayrolls = async(req,res)=>{
  try {
    const data = await Payroll.find().populate('employeeId', 'firstName lastName email employeeId');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
