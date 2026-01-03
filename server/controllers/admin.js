import Employee from "../models/Employee.js";
import bcrypt from "bcryptjs";
import { generatePassword } from "../utils/generatePassword.js";

/**
 * Get all employees (Admin only)
 * @route GET /admin/employees
 */
export const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find()
            .select('-password')
            .sort({ createdAt: -1 });

        res.json(employees);
    } catch (error) {
        console.error("Get all employees error:", error);
        res.status(500).json({ error: "Server error fetching employees" });
    }
};

/**
 * Get employee by ID (Admin only)
 * @route GET /admin/employees/:id
 */
export const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await Employee.findById(id).select('-password');

        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }

        res.json(employee);
    } catch (error) {
        console.error("Get employee by ID error:", error);
        res.status(500).json({ error: "Server error fetching employee" });
    }
};

/**
 * Create employee (Admin only)
 * @route POST /admin/employees
 */
export const createEmployee = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, privateInfo, bankDetails } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email) {
            return res.status(400).json({ error: "First name, last name, and email are required" });
        }

        // Check if employee with email already exists
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ error: "Employee with this email already exists" });
        }

        // Generate employee ID
        const employeeCount = await Employee.countDocuments();
        const serialNo = employeeCount + 1;
        const employeeId = `EMP${String(serialNo).padStart(4, '0')}`;

        // Generate temporary password
        const tempPassword = generatePassword();
        const hashedPassword = await bcrypt.hash(tempPassword, 10);

        // Create employee
        const employee = await Employee.create({
            firstName,
            lastName,
            email,
            phone: phone || "",
            employeeId,
            serialNo,
            password: hashedPassword,
            role: "EMPLOYEE",
            mustChangePassword: true,
            privateInfo: privateInfo || {},
            bankDetails: bankDetails || {}
        });

        res.status(201).json({
            message: "Employee created successfully",
            employee: {
                id: employee._id,
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email,
                employeeId: employee.employeeId
            },
            tempPassword // Send this to admin to share with employee
        });
    } catch (error) {
        console.error("Create employee error:", error);
        res.status(500).json({ error: "Server error creating employee" });
    }
};

/**
 * Update employee (Admin only - all fields)
 * @route PUT /admin/employees/:id
 */
export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Don't allow updating password through this endpoint
        delete updateData.password;
        delete updateData._id;
        delete updateData.employeeId; // Don't allow changing employee ID

        const employee = await Employee.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).select('-password');

        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }

        res.json({
            message: "Employee updated successfully",
            employee
        });
    } catch (error) {
        console.error("Update employee error:", error);
        res.status(500).json({ error: "Server error updating employee" });
    }
};

/**
 * Delete employee (Admin only)
 * @route DELETE /admin/employees/:id
 */
export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await Employee.findByIdAndDelete(id);

        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }

        res.json({ message: "Employee deleted successfully" });
    } catch (error) {
        console.error("Delete employee error:", error);
        res.status(500).json({ error: "Server error deleting employee" });
    }
};
