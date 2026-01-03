import Employee from "../models/Employee.js";

/**
 * Get employee's own profile
 * @route GET /employee/profile
 */
export const getProfile = async (req, res) => {
  try {
    const employeeId = req.user.id; // From auth middleware

    const employee = await Employee.findById(employeeId).select('-password');

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ error: "Server error fetching profile" });
  }
};

/**
 * Update employee's own profile (limited fields)
 * Employees can only update: phone, address, profilePicture
 * @route PUT /employee/profile
 */
export const updateProfile = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const { phone, address } = req.body;

    // Only allow updating specific fields
    const updateData = {};
    if (phone !== undefined) updateData.phone = phone;
    if (address !== undefined) updateData['privateInfo.address'] = address;

    const employee = await Employee.findByIdAndUpdate(
      employeeId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json({
      message: "Profile updated successfully",
      employee
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ error: "Server error updating profile" });
  }
};

/**
 * Update profile picture
 * @route POST /employee/profile/picture
 */
export const updateProfilePicture = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const { profilePicture } = req.body; // Base64 or URL

    if (!profilePicture) {
      return res.status(400).json({ error: "Profile picture is required" });
    }

    const employee = await Employee.findByIdAndUpdate(
      employeeId,
      { profilePicture },
      { new: true }
    ).select('-password');

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json({
      message: "Profile picture updated successfully",
      profilePicture: employee.profilePicture
    });
  } catch (error) {
    console.error("Update profile picture error:", error);
    res.status(500).json({ error: "Server error updating profile picture" });
  }
};
