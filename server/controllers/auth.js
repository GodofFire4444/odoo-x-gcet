import Admin from "../models/Admin.js";
import Employee from "../models/Employee.js";
import bcrypt from "bcryptjs";
import { signToken } from "../utils/jwt.js";
import { validatePassword, validateEmail } from "../utils/validation.js";

/**
 * User login controller
 * Supports both ADMIN and EMPLOYEE roles
 */
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Validate input
    if (!email || !password || !role) {
      return res.status(400).json({ error: "Email, password, and role are required" });
    }

    let user;

    if (role === "ADMIN") {
      user = await Admin.findOne({ email });
    } else if (role === "EMPLOYEE") {
      user = await Employee.findOne({ email });
    } else {
      return res.status(400).json({ error: "Invalid role" });
    }

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: "Wrong password" });
    }

    // Create token with user info
    const tokenPayload = {
      id: user._id,
      role: role,
      email: user.email
    };

    const token = signToken(tokenPayload);

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: role
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error during login" });
  }
};

/**
 * User registration controller
 * Supports both ADMIN and EMPLOYEE registration
 */
export const register = async (req, res) => {
  try {
    console.log("Registration request received:", { ...req.body, password: "REDACTED" });
    const { email, password, role, firstName, lastName, name, companyName, phone } = req.body;

    // Validate required fields
    if (!email || !password || !role) {
      const msg = "Email, password, and role are required";
      console.log("Registration failed:", msg, { email, role });
      return res.status(400).json({ error: msg });
    }

    // Validate email format
    if (!validateEmail(email)) {
      const msg = "Invalid email format";
      console.log("Registration failed:", msg, email);
      return res.status(400).json({ error: msg });
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      const msg = `Password does not meet requirements: ${passwordValidation.errors.join(", ")}`;
      console.log("Registration failed:", msg);
      return res.status(400).json({
        error: msg,
        details: passwordValidation.errors
      });
    }

    // Check if user already exists
    let existingUser;
    if (role === "ADMIN") {
      existingUser = await Admin.findOne({ email });
    } else if (role === "EMPLOYEE") {
      existingUser = await Employee.findOne({ email });
    } else {
      return res.status(400).json({ error: "Invalid role. Must be ADMIN or EMPLOYEE" });
    }

    if (existingUser) {
      const msg = "User with this email already exists";
      console.log("Registration failed:", msg, email);
      return res.status(400).json({ error: msg });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;

    if (role === "ADMIN") {
      // Create admin user
      newUser = new Admin({
        name: name || firstName || "",
        companyName: companyName || "",
        email,
        phone: phone || "",
        password: hashedPassword,
        role: "ADMIN",
        emailVerified: false
      });
      await newUser.save();
    } else {
      // Generate employee ID 
      const employeeCount = await Employee.countDocuments();
      const employeeId = `EMP${String(employeeCount + 1).padStart(4, '0')}`;

      // Create employee user
      newUser = new Employee({
        email,
        password: hashedPassword,
        firstName: firstName || "",
        lastName: lastName || "",
        phone: phone || "",
        employeeId,
        serialNo: employeeCount + 1,
        role: "EMPLOYEE",
        emailVerified: false,
        mustChangePassword: false
      });
      await newUser.save();
    }

    // Create token
    const tokenPayload = {
      id: newUser._id,
      role: role,
      email: newUser.email
    };

    const token = signToken(tokenPayload);

    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        role: role,
        employeeId: role === "EMPLOYEE" ? newUser.employeeId : undefined
      }
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: `Server error during registration: ${error.message}` });
  }
};
