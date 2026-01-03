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
  try {
    console.log("Admin Signup Request Body:", req.body);
    const { name, companyName,email,phone,password } = req.body;
    // Basic validation
    if (!name || !companyName || !email || !phone || !password) {
      console.warn('Signup missing fields:', { name, companyName, email, phone });
      return res.status(400).json({ error: 'Missing required signup fields' });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.warn('Signup attempt with existing email:', email);
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashed = await bcrypt.hash(password,10);

    const admin = await Admin.create({
      name,
      companyName,
      email,
      phone,
      password: hashed
    });

    console.log("Admin Created:", admin._id);
    res.json({ message: "Admin created", id: admin._id });
  } catch (error) {
    console.error("Signup Error:", error && error.message ? error.message : error);
    if (error && error.code === 11000) {
      return res.status(400).json({ error: 'Duplicate key error', details: error.keyValue });
    }
    res.status(500).json({ error: "Server error during signup" });
  }
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
  try {
    const { firstName, lastName, email } = req.body;

    if (!firstName || !lastName || !email) return res.status(400).json({ error: 'Missing required fields' });

    // Check if email already exists across employees
    const existingEmp = await Employee.findOne({ email });
    if (existingEmp) return res.status(400).json({ error: 'Employee email already registered' });

    // Use countDocuments to safely compute next serial
    const count = await Employee.countDocuments({ adminId: req.user.id });
    const serialNo = count + 1;
    const fourDigitSerial = serialNo.toString().padStart(4, "0");

    const employeeId = `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${fourDigitSerial}`;

    // Use a default temporary password for new employees
    const tempPassword = 'test@123';
    const hashed = await bcrypt.hash(tempPassword, 10);

    const emp = await Employee.create({
      adminId: req.user.id,
      firstName,
      lastName,
      serialNo,
      employeeId,
      email,
      password: hashed,
      role: "EMPLOYEE",
      mustChangePassword: true
    });

    const out = {
      message: "Employee created successfully",
      employeeId: emp.employeeId,
      tempPassword
    };

    res.json(out);
  } catch (err) {
    console.error('Error creating employee', err);
    if (err.code === 11000) return res.status(400).json({ error: 'Duplicate key error' });
    res.status(500).json({ error: 'Server error' });
  }
});

// GET ALL EMPLOYEES
router.get("/employees", auth, adminOnly, async(req,res)=>{
  const employees = await Employee.find({ adminId: req.user.id }).select("-password");
  res.json(employees);
});


export default router;

//updated updated employee
