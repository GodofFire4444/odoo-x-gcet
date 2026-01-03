export const requireAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN")
    return res.status(403).json({ error: "Admin only" });
  next();
};

export const requireEmployee = (req, res, next) => {
  if (req.user.role !== "EMPLOYEE")
    return res.status(403).json({ error: "Employee only" });
  next();
};
