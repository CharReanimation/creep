import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // Not authenticated
  if (!token) return res.status(401).json({ code: 401, error: "Not authenticated" });

  try {
    // Decoded JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ code: 403, error: "Invalid Token!" });
  }
};
