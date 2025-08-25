import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Router
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const exist = await User.findOne({ email });

    // Email has already been used
    if (exist)
      return res.status(400).json({
        code: 400,
        error: "Email has already been used!",
      });

    // Hashed password
    const hash = await bcrypt.hash(password, 10);

    // Save user
    const user = new User({ username, email, password: hash });
    await user.save();

    // Success
    res.status(200).json({
      code: 200,
      message: "Registration Successful!",
    });
  } catch (err) {
    res.status(500).json({ error: "Registration Failed!" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User Not Exist!" });

    // Check if password is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Wrong Password!" });

    // JWT
    const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1h" });

    // Success
    res.status(200).json({ 
      code: 200, 
      message: "Login Successful!", 
      token, 
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ error: "Login Failed!" });
  }
});

// Get User Profile
router.get("/profile", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, "SECRET_KEY");
    const user = await User.findById(decoded.id).select("-password"); // Not return password
    res.json(user);
  } catch (err) {
    res.status(403).json({ error: "Useless Token!" });
  }
});

// Export
export default router;
