import Payroll from "../models/Payroll.js";
import Employee from "../models/Employee.js";

/**
 * Get employee's own payroll records
 * @route GET /payroll/my
 */
export const getMyPayroll = async (req, res) => {
  try {
    const employeeId = req.user.id;

    const payrolls = await Payroll.find({ employeeId })
      .sort({ createdAt: -1 })
      .limit(12); // Last 12 months

    res.json(payrolls);
  } catch (error) {
    console.error("Get my payroll error:", error);
    res.status(500).json({ error: "Server error fetching payroll" });
  }
};

/**
 * Get all payrolls (Admin only)
 * @route GET /payroll/all
 */
export const getAllPayrolls = async (req, res) => {
  try {
    const { employeeId, month } = req.query;

    const query = {};
    if (employeeId) query.employeeId = employeeId;
    if (month) query.month = month;

    const payrolls = await Payroll.find(query)
      .populate('employeeId', 'firstName lastName email employeeId')
      .populate('adminId', 'name email')
      .sort({ createdAt: -1 })
      .limit(500);

    res.json(payrolls);
  } catch (error) {
    console.error("Get all payrolls error:", error);
    res.status(500).json({ error: "Server error fetching payrolls" });
  }
};

/**
 * Create payroll (Admin only)
 * @route POST /payroll
 */
export const createPayroll = async (req, res) => {
  try {
    const adminId = req.user.id;
    const payrollData = { ...req.body, adminId };

    // Calculate gross salary, deductions, and net salary
    const components = payrollData.components || {};
    const grossSalary =
      (components.basicSalary || 0) +
      (components.hra || 0) +
      (components.standardAllowance || 0) +
      (components.performanceBonus || 0) +
      (components.leaveTravelAllowance || 0) +
      (components.fixedAllowance || 0);

    const pf = payrollData.pf || {};
    const tax = payrollData.tax || {};
    const totalDeductions =
      (pf.employee || 0) +
      (tax.professionalTax || 0);

    const netSalary = grossSalary - totalDeductions;

    payrollData.grossSalary = grossSalary;
    payrollData.totalDeductions = totalDeductions;
    payrollData.netSalary = netSalary;

    const payroll = await Payroll.create(payrollData);

    const populatedPayroll = await Payroll.findById(payroll._id)
      .populate('employeeId', 'firstName lastName email employeeId')
      .populate('adminId', 'name email');

    res.status(201).json({
      message: "Payroll created successfully",
      payroll: populatedPayroll
    });
  } catch (error) {
    console.error("Create payroll error:", error);
    res.status(500).json({ error: "Server error creating payroll" });
  }
};

/**
 * Update payroll (Admin only)
 * @route PUT /payroll/:id
 */
export const updatePayroll = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Recalculate if components changed
    if (updateData.components || updateData.pf || updateData.tax) {
      const existingPayroll = await Payroll.findById(id);
      if (!existingPayroll) {
        return res.status(404).json({ error: "Payroll not found" });
      }

      const components = updateData.components || existingPayroll.components || {};
      const grossSalary =
        (components.basicSalary || 0) +
        (components.hra || 0) +
        (components.standardAllowance || 0) +
        (components.performanceBonus || 0) +
        (components.leaveTravelAllowance || 0) +
        (components.fixedAllowance || 0);

      const pf = updateData.pf || existingPayroll.pf || {};
      const tax = updateData.tax || existingPayroll.tax || {};
      const totalDeductions =
        (pf.employee || 0) +
        (tax.professionalTax || 0);

      const netSalary = grossSalary - totalDeductions;

      updateData.grossSalary = grossSalary;
      updateData.totalDeductions = totalDeductions;
      updateData.netSalary = netSalary;
    }

    const payroll = await Payroll.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    )
      .populate('employeeId', 'firstName lastName email employeeId')
      .populate('adminId', 'name email');

    if (!payroll) {
      return res.status(404).json({ error: "Payroll not found" });
    }

    res.json({
      message: "Payroll updated successfully",
      payroll
    });
  } catch (error) {
    console.error("Update payroll error:", error);
    res.status(500).json({ error: "Server error updating payroll" });
  }
};

/**
 * Delete payroll (Admin only)
 * @route DELETE /payroll/:id
 */
export const deletePayroll = async (req, res) => {
  try {
    const { id } = req.params;

    const payroll = await Payroll.findByIdAndDelete(id);

    if (!payroll) {
      return res.status(404).json({ error: "Payroll not found" });
    }

    res.json({ message: "Payroll deleted successfully" });
  } catch (error) {
    console.error("Delete payroll error:", error);
    res.status(500).json({ error: "Server error deleting payroll" });
  }
};
