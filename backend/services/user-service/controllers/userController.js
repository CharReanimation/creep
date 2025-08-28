import User from "../models/User.js";

// Get User Profile
export const getProfile = async (req, res) => {
  try {
    // Find user by id
    const user = await User.findById(req.user.id).select(
      "username email roles profile createdAt"
    );
    res.json(user);
  } catch (err) {
    res.status(403).json({ code: 403, error: "Profile fetch failed!" });
  }
};

// Update User Profile
export const updateProfile = async (req, res) => {
  const { avatar, bio, location } = req.body;
  try {
    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          "profile.avatar": avatar,
          "profile.bio": bio,
          "profile.location": location,
        },
      },
      { new: true }
    ).select("username email roles profile createdAt");

    res.status(200).json({ code: 200, message: "Profile Updated!", user: updatedUser });
  } catch (err) {
    res.status(500).json({ code: 500, error: "Profile Update Failed!" });
  }
};
