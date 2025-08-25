import { useState, useEffect } from "react"; // React

// API
import { Get_Profile } from "../../../../API/API_USER";

// User Get Profile
export const useGetProfile = () => {
  // State
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get Profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await Get_Profile();
        setUser(data);
      } catch (err) {
        console.error("Failed To Get User Profile: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Return
  return { user, loading };
};

