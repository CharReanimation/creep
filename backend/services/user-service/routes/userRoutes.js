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
    // Check Username
    const existUsername = await User.findOne({ username });
    if (existUsername) {
      return res
        .status(400)
        .json({ code: 400, error: "Username has already been used!" });
    }

    // Check Password
    if (password.length < 6) {
      return res.status(400).json({
        code: 400,
        error: "Password must be at least 6 characters long!",
      });
    }

    // Check if user already exists
    const exist = await User.findOne({ email: email.toLowerCase() });

    // Email has already been used
    if (exist)
      return res.status(400).json({
        code: 400,
        error: "Email has already been used!",
      });

    // Hashed password
    const hash = await bcrypt.hash(password, 10);

    // Save user
    const user = new User({
      username,
      email: email.toLowerCase(),
      password: hash,
    });
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

  // Debug: Login Email
  console.log("Email: ", email);

  try {
    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(400).json({ error: "User Not Exist!" });

    // Check if password is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(400).json({ code: 400, error: "Wrong Password!" });

    // JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Success
    res.status(200).json({
      code: 200,
      message: "Login Successful!",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ error: "Login Failed!" });
  }
});

// Get User Profile
router.get("/profile", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({ code: 401, error: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select(
      "username email roles profile createdAt"
    );
    res.json(user);
  } catch (err) {
    res.status(403).json({ code: 403, error: "Invalid Token!" });
  }
});

// Update User Profile
router.put("/profile", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({ code: 401, error: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Permitted Fields
    const { avatar, bio, location } = req.body;

    // Update User Profile
    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      {
        $set: {
          "profile.avatar": avatar,
          "profile.bio": bio,
          "profile.location": location,
        },
      },
      { new: true } // Return the updated user
    ).select("username email roles profile createdAt");

    res.status(200).json({
      code: 200,
      message: "Profile Updated Successfully!",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Profile Update Error:", err);
    res.status(500).json({ code: 500, error: "Profile Update Failed!" });
  }
});

// Export
export default router;
