export const isAdmin = (req, res, next) => {
  // Check if the user is an admin
  if (!req.user || !req.user.roles.includes("admin")) {
    return res.status(403).json({ code: 403, error: "Permission denied!" });
  }
  next();
};
