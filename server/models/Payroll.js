import mongoose from "mongoose";

const payrollSchema = new mongoose.Schema({

  employeeId: { type: mongoose.Types.ObjectId, ref: "Employee" },
  adminId: { type: mongoose.Types.ObjectId, ref: "Admin" },

  monthlyWage: Number,
  yearlyWage: Number,

  workingDaysPerWeek: Number,
  breakTimeHours: Number,

  components: {
    basicSalary: Number,
    hra: Number,
    standardAllowance: Number,
    performanceBonus: Number,
    leaveTravelAllowance: Number,
    fixedAllowance: Number
  },

  pf: {
    employee: Number,
    employer: Number,
    percentage: Number
  },

  tax: {
    professionalTax: Number
  },

  grossSalary: Number,
  totalDeductions: Number,
  netSalary: Number

}, { timestamps: true });

export default mongoose.model("Payroll", payrollSchema);
