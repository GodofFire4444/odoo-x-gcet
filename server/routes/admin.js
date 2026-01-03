import express from "express";
import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";
import { auth } from "../middleware/auth.js";
import { adminOnly } from "../middleware/roles.js";

import bcrypt from "bcryptjs";
import Employee from "../models/Employee.js";
import { generatePassword } from "../utils/generatePassword.js";

const router = express.Router();

// ADMIN SIGNUP
router.post("/signup", async(req,res)=>{

  const { companyName,email,phone,password } = req.body;

  const hashed = await bcrypt.hash(password,10);

  const admin = await Admin.create({
    companyName,email,phone,password:hashed
  });

  res.json({ message:"Admin created" });
});


// CREATE EMPLOYEE
// router.post("/create-employee", auth, adminOnly, async(req,res)=>{

//   const { firstName,lastName,email } = req.body;

//   const count = await Employee.countDocuments({ adminId:req.user.id });
//   const serial = count + 1;

//   const employeeId = `${firstName}.${lastName}.${serial}`;

//   const tempPassword = Math.random().toString(36).slice(-8);

//   const hashed = await bcrypt.hash(tempPassword,10);

//   await Employee.create({
//     adminId: req.user.id,
//     firstName,
//     lastName,
//     email,
//     serialNo: serial,
//     employeeId,
//     password:hashed
//   });

//   res.json({
//     message:"Employee Created",
//     employeeId,
//     tempPassword
//   });
// });


router.post("/create-employee", auth, adminOnly, async (req,res)=>{

  const { firstName, lastName, email } = req.body;

  // ⭐ 1) Find last created employee for this admin
  const lastEmp = await Employee.findOne({ adminId: req.user.id })
    .sort({ createdAt: -1 });

  // ⭐ 2) Generate NEXT serial
  let serialNo = 1;

  if(lastEmp){
    serialNo = (lastEmp.serialNo || 0) + 1;
  }

  // ⭐ 3) Convert to 4-digit format
  const fourDigitSerial = serialNo.toString().padStart(4, "0");


  // ⭐ 4) employeeId format
  const employeeId =
    `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${fourDigitSerial}`;


  // ⭐ 5) Generate temp password
  const tempPassword = generatePassword();

  // ⭐ 6) Hash password
  const hashed = await bcrypt.hash(tempPassword, 10);


  // ⭐ 7) Save employee
  const emp = await Employee.create({
    adminId: req.user.id,
    firstName,
    lastName,
    serialNo,               // pure number for sorting
    employeeId,             // includes 4 digits
    email,
    password: hashed,
    role: "EMPLOYEE",
    mustChangePassword: true
  });


  // ⭐ 8) Return temp login details
  res.json({
    message:"Employee created successfully",
    employeeId,
    tempPassword
  });

});


export default router;

//updated updated employee
