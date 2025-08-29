import User from "../models/User.js";

// Get All Users
export const getAllUsers = async (req, res) => {
  try {
    // User
    const users = await User.find().select("username email roles createdAt");

    // Succcess
    res.json(users);
  } catch (err) {
    res.status(500).json({ code: 500, error: "Failed to fetch users!" });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    // User
    const userId = req.params.id;

    // Find and delete user
    await User.findByIdAndDelete(userId);

    // Succcess
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
