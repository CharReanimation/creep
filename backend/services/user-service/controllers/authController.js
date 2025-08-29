import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Register
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Find User
    if (await User.findOne({ username })) {
      return res
        .status(400)
        .json({ code: 400, error: "Username already used!" }); // Username has exist
    }

    // Password
    if (password.length < 6) {
      return res.status(400).json({ code: 400, error: "Password too short!" }); // Invalid Password
    }

    // Email
    if (await User.findOne({ email: email.toLowerCase() })) {
      return res.status(400).json({ code: 400, error: "Email already used!" }); // Email has exist
    }

    // Hashed Pasword
    const hash = await bcrypt.hash(password, 10);

    // User
    const user = new User({
      username,
      email: email.toLowerCase(),
      password: hash,
    });
    await user.save();

    res.status(200).json({ code: 200, message: "Registration Successful!" });
  } catch (err) {
    res.status(500).json({ error: "Registration Failed!" });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find User
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(400).json({ error: "User Not Exist!" }); // User Not Exist

    // Password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(400).json({ code: 400, error: "Wrong Password!" }); // Wrong Password

    // JWT Payload
    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
      roles: user.roles,
    };

    // JWT Sign
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      code: 200,
      message: "Login Successful!",
      token,
      user: payload,
    });
  } catch (err) {
    res.status(500).json({ error: "Login Failed!" });
  }
};
