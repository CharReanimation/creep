import mongoose from "mongoose";

// User
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Username
  email: { type: String, required: true, unique: true }, // Email
  password: { type: String, required: true }, // Hashed password
  roles: { type: [String], default: ["user"] }, // user/admin
  profile: { // Profile
    avatar: { type: String },
    bio: { type: String },
    location: { type: String }
  },
  createdAt: { type: Date, default: Date.now } // Created time
});

// Export
export default mongoose.model("User", userSchema);
