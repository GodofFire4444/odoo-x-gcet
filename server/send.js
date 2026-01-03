// import mongoose from "mongoose";
// import Admin from "./models/Admin.js";
// import Employee from "./models/Employee.js";
// import dotenv from "dotenv";
// dotenv.config();

// console.log("MONGO_URI =", process.env.MONGO_URI);

// await mongoose.connect(process.env.MONGO_URI);


// await Admin.deleteMany();
// await Employee.deleteMany();

// const admin1 = await Admin.create({
//   companyName: "TechWave Solutions",
//   email: "admin@techwave.com",
//   phone: "+91 9876543210",
//   password: "$2b$10$abcAdminPassHashed"
// });

// const admin2 = await Admin.create({
//   companyName: "SkyNet HR Services",
//   email: "hr@skynethr.com",
//   phone: "+91 9123456789",
//   password: "$2b$10$xyzAdminPassHashed"
// });

// await Employee.insertMany([
//   {
//     adminId: admin1._id,
//     firstName: "Raj",
//     lastName: "Sharma",
//     serialNo: 1,
//     employeeId: "raj.sharma.1",
//     email: "raj.sharma@techwave.com",
//     password: "$2b$10$tempPass1"
//   },
//   {
//     adminId: admin1._id,
//     firstName: "Anjali",
//     lastName: "Verma",
//     serialNo: 2,
//     employeeId: "anjali.verma.2",
//     email: "anjali.verma@techwave.com",
//     password: "$2b$10$tempPass2"
//   },
//   {
//     adminId: admin2._id,
//     firstName: "Priya",
//     lastName: "Nair",
//     serialNo: 1,
//     employeeId: "priya.nair.1",
//     email: "priya.nair@skynethr.com",
//     password: "$2b$10$tempPass3"
//   }
// ]);

// console.log("Seeded successfully");
// process.exit();



//second time 
// import dotenv from "dotenv";
// dotenv.config();

// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// import Admin from "./models/Admin.js";
// import Employee from "./models/Employee.js";
// import Attendance from "./models/Attendance.js";
// import Payroll from "./models/Payroll.js";

// const connectDB = async () => {
//   await mongoose.connect(process.env.MONGO_URI);
//   console.log("DB Connected");
// };

// const seed = async () => {

//   await connectDB();

//   console.log("\nClearing old data...");
//   await Admin.deleteMany();
//   await Employee.deleteMany();
//   await Attendance.deleteMany();
//   await Payroll.deleteMany();

//   console.log("Old data removed\n");

//   // ======================
//   // CREATE ADMIN
//   // ======================

//   const adminPass = await bcrypt.hash("admin123", 10);

//   const admin = await Admin.create({
//     companyName: "TechWave Solutions",
//     email: "admin@techwave.com",
//     phone: "+91 9876543210",
//     password: adminPass
//   });

//   console.log("Admin created:", admin.email);


//   // ======================
//   // CREATE EMPLOYEES
//   // ======================

//   const employeesData = [
//     {
//       firstName: "Raj",
//       lastName: "Sharma",
//       email: "raj@techwave.com"
//     },
//     {
//       firstName: "Anjali",
//       lastName: "Verma",
//       email: "anjali@techwave.com"
//     },
//     {
//       firstName: "Aman",
//       lastName: "Kumar",
//       email: "aman@techwave.com"
//     }
//   ];

//   let serial = 1;
//   let employees = [];

//   for (let e of employeesData) {

//     const empPass = await bcrypt.hash("password123", 10);

//     const empId = `${e.firstName.toLowerCase()}.${e.lastName.toLowerCase()}.${serial}`;

//     const emp = await Employee.create({
//       adminId: admin._id,
//       firstName: e.firstName,
//       lastName: e.lastName,
//       serialNo: serial,
//       employeeId: empId,
//       email: e.email,
//       password: empPass,
//       role: "EMPLOYEE",
//       mustChangePassword: true,
//       privateInfo: {
//         nationality: "Indian",
//         dateOfJoining: new Date("2024-01-01")
//       }
//     });

//     employees.push(emp);
//     console.log("Employee created:", emp.employeeId);
//     serial++;
//   }


//   // ======================
//   // ATTENDANCE
//   // ======================

//   console.log("\nCreating attendance...");

//   for (let emp of employees) {

//     const today = new Date();
//     today.setHours(0,0,0,0);

//     const checkIn = new Date();
//     checkIn.setHours(9, 0, 0);

//     const checkOut = new Date();
//     checkOut.setHours(17, 0, 0);

//     const hours = (checkOut - checkIn)/(1000*60*60);

//     await Attendance.create({
//       employeeId: emp._id,
//       date: today,
//       checkIn,
//       checkOut,
//       totalHours: hours
//     });

//     console.log(`Attendance created for ${emp.firstName}`);
//   }


//   // ======================
//   // PAYROLL
//   // ======================

//   console.log("\nCreating payroll...");

//   for (let emp of employees) {

//     await Payroll.create({
//       employeeId: emp._id,
//       adminId: admin._id,

//       monthlyWage: 50000,
//       yearlyWage: 600000,

//       workingDaysPerWeek: 6,
//       breakTimeHours: 1,

//       components: {
//         basicSalary: 25000,
//         hra: 12500,
//         standardAllowance: 4000,
//         performanceBonus: 2000,
//         leaveTravelAllowance: 2000,
//         fixedAllowance: 2500
//       },

//       pf: {
//         employee: 3000,
//         employer: 3000,
//         percentage: 12
//       },

//       tax: {
//         professionalTax: 200
//       },

//       grossSalary: 49000,
//       totalDeductions: 3200,
//       netSalary: 45800
//     });

//     console.log(`Payroll created for ${emp.firstName}`);
//   }


//   console.log("\n✔ DATABASE SEEDED SUCCESSFULLY ✔\n");

//   process.exit();
// };

// seed();
