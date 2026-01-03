import Admin from "../models/Admin.js";
import Employee from "../models/Employee.js";
import bcrypt from "bcryptjs";
import { signToken } from "../utils/jwt.js";

export const login = async (req,res)=>{

  const { email,password,role } = req.body;

  let user;

  if(role === "ADMIN") user = await Admin.findOne({ email });
  else user = await Employee.findOne({ email });

  if(!user) return res.status(400).json({error:"User not found"});

  const match = await bcrypt.compare(password, user.password);
  if(!match) return res.status(400).json({error:"Wrong password"});
  
  // Ensure role is set correctly in token
  const tokenPayload = { 
    id: user._id, 
    role: role 
  };
  
  const token = signToken(tokenPayload);

  res.json({ token });
};
