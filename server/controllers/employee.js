import Employee from "../models/Employee.js";
import bcrypt from "bcryptjs";
import { generatePassword } from "../utils/generatePassword.js";

export const createEmployee = async(req,res)=>{

  const { firstName,lastName,email } = req.body;

  const count = await Employee.countDocuments({ adminId:req.user.id });
  const serialNo = count + 1;

  const employeeId = `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${serialNo}`;

  const tempPassword = generatePassword();
  const hashed = await bcrypt.hash(tempPassword,10);

  await Employee.create({
    adminId:req.user.id,
    firstName,
    lastName,
    serialNo,
    employeeId,
    email,
    password:hashed
  });

  res.json({ message:"Employee created", employeeId, tempPassword });
};

export const getMyProfile = async(req,res)=>{
  const user = await Employee.findById(req.user.id).select("-password");
  res.json(user);
};

export const updateMyProfile = async(req,res)=>{
  const user = await Employee.findByIdAndUpdate(req.user.id, req.body, { new:true });
  res.json(user);
};
