import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Hooks
import { useGetProfile } from "./hooks/Hook_User";

// Handlers
import { HandleUpdateProfile } from "./handlers/Handler_User";

// CSS
import "./css/Dashboard_Edit.css";

// Dashboard Edit
const Dashboard_Edit = () => {
  // Nav
  const navigate = useNavigate();

  // State
  const { user } = useGetProfile();
  const { updateProfile, loading, error, success } = HandleUpdateProfile();
  const [form, setForm] = useState({
    avatar: "",
    bio: "",
    location: "",
  });
  const [preview, setPreview] = useState(null); // Avatar Preview

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

  // Handle Text Change
  const handleTextChange = (e) => {
    // name, value
    const { name, value } = e.target;

    // Set Form
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle File Change
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // Choose File
    if (!file.type.startsWith("image/")) {
      alert("请选择图片文件");
      return;
    }
    // Check Size
    if (file.size > 2 * 1024 * 1024) {
      alert("图片大小不能超过 2MB");
      return;
    }
    // Preview
    setPreview(URL.createObjectURL(file));

    // Need to be completed
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateProfile(form);
      console.log("Updated User Profile: ", updatedUser);
      // Navigate to Dashboard
      navigate("/user/dashboard");
    } catch {
      console.log("Failed to update user profile");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Failed to get User Profile</div>;

  // Return
  return (
    <div className="dashboard-edit-body">
      <div className="dashboard-edit-body-container">
        <form className="dashboard-edit-form" onSubmit={handleSubmit}>
          {/* Avatar */}
          <label>
            Avatar URL
            <input
              type="text"
              name="avatar"
              value={form.avatar}
              onChange={handleTextChange}
              placeholder="https://example.com/avatar.png"
            />
          </label>

          {/* Upload Image */}
          <label htmlFor="img">Select image:</label>
          <input
            className="dashboard-edit-form-avatar-choose-file"
            type="file"
            id="img"
            name="img"
            accept="image/*"
            onChange={handleFileChange} // File Change
          />

          {/* Preview */}
          {preview && (
            <div className="dashboard-edit-form-avatar-preview-container">
              <img
                className="dashboard-edit-form-avatar-preview"
                src={preview}
                alt="preview"
                style={{ maxWidth: "100px" }}
              />
            </div>
          )}

          {/* Bio */}
          <label>
            Bio
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleTextChange}
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
              onChange={handleTextChange}
              placeholder="城市/地区"
            />
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="dashboard-edit-form-button anim-fade-in"
            disabled={loading}
          >
            {loading ? "Saving" : "Save Modified Profile"}
          </button>
        </form>
        {/* Cancel Button */}
        <button
          disabled={loading}
          className="dashboard-edit-cancel-button anim-fade-in"
          onClick={() => navigate("/user/dashboard")}
        >
          CANCEL
        </button>
      </div>

      {/* Message Return */}
      {success &&
        // Debug
        console.log("Profile Updated Successfully")}
      {error &&
        // Debug
        console.log("Error Updating Profile")}
    </div>
  );
};

// Export
export default Dashboard_Edit;
