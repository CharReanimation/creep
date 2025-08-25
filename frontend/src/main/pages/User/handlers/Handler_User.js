import { useState } from "react"; // React

// API
import { Update_Profile } from "../../../../API/API_USER";

// User Update Profile
export const HandleUpdateProfile = () => {
  // State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Update Profile
  const updateProfile = async (data) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      // Request
      const res = await Update_Profile(data);

      setSuccess(true);
      return res.user;
    } catch (err) {
      console.error("Failed To Update User Profile:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Return
  return { updateProfile, loading, error, success };
};