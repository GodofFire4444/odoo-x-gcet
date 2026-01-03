import Payroll from "../models/Payroll.js";

export const createPayroll = async(req,res)=>{
  req.body.adminId = req.user.id;
  const data = await Payroll.create(req.body);
  res.json(data);
};

export const getMyPayroll = async(req,res)=>{
  const data = await Payroll.findOne({ employeeId:req.user.id });
  res.json(data);
};
