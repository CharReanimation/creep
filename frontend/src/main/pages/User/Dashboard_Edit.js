import React, { useState, useEffect } from "react";

// Hooks
import { useGetProfile } from "./hooks/Hook_User";

// Handlers
import { HandleUpdateProfile } from "./handlers/Handler_User";

// CSS
import "./css/Dashboard_Edit.css";

// Dashboard Edit
const Dashboard_Edit = () => {
  // State
  const { user } = useGetProfile();
  const { updateProfile, loading, error, success } = HandleUpdateProfile();
  const [form, setForm] = useState({
    avatar: "",
    bio: "",
    location: "",
  });

  // Initialize Form
  useEffect(() => {
    if (user) {
      setForm({
        avatar: user.profile?.avatar || "",
        bio: user.profile?.bio || "",
        location: user.profile?.location || "",
      });
    }
  }, [user]);

  // Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateProfile(form);
      console.log("Updated User Profile: ", updatedUser);
    } catch {
      console.log("Failed to update user profile");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Failed to get User Profile</div>;

  return (
    <div className="dashboard-edit-body">
      <h1>Edit Profile ✏️</h1>

      <form className="dashboard-edit-form" onSubmit={handleSubmit}>
        {/* Avatar */}
        <label>
          Avatar URL
          <input
            type="text"
            name="avatar"
            value={form.avatar}
            onChange={handleChange}
            placeholder="https://example.com/avatar.png"
          />
        </label>

        {/* Bio */}
        <label>
          Bio
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="写一点自我介绍..."
          />
        </label>

        {/* Location */}
        <label>
          Location
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="城市/地区"
          />
        </label>

        {/* Submit Button */}
        <button type="submit" disabled={loading}>
          {loading ? "Saving" : "Save Modified Profile"}
        </button>
      </form>

      {/* Message Return */}
      {success && (
        <p className="dashboard-edit-message success">✅ Profile Updated!</p>
      )}
      {error && (
        <p className="dashboard-edit-message error">❌ Update Failed</p>
      )}
    </div>
  );
};

// Export
export default Dashboard_Edit;
