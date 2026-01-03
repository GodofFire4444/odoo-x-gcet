import Attendance from "../models/Attendance.js";

export const checkIn = async(req,res)=>{

  const employeeId = req.user.id;
  const today = new Date();
  today.setHours(0,0,0,0);

  let rec = await Attendance.findOne({ employeeId,date:today });

  if(rec) return res.json({ message:"Already checked in" });

  rec = await Attendance.create({
    employeeId,
    date:today,
    checkIn:new Date()
  });

  res.json(rec);
};

export const checkOut = async(req,res)=>{

  const employeeId = req.user.id;
  const today = new Date();
  today.setHours(0,0,0,0);

  let rec = await Attendance.findOne({ employeeId,date:today });

  if(!rec) return res.status(400).json({ error: "No check-in found for today" });

  rec.checkOut = new Date();

  if (rec.checkIn) {
    rec.totalHours = (rec.checkOut - rec.checkIn) / (1000 * 60 * 60);
  } else {
    rec.totalHours = 0;
  }

  await rec.save();

  res.json(rec);
};
