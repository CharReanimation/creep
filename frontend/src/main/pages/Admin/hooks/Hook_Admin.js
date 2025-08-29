import { useState, useEffect } from "react"; // React

// API
import { Get_All_Users } from "../../../../API/API_USER";

// Use Get Profile
export const useGetAllUsers = () => {
  // State
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get All Users
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const data = await Get_All_Users();
        setUsers(data);
      } catch (err) {
        console.error("Failed To Get All Users:", err.response?.data || err.message || err);
        setError(err.message || "Failed to Get All Users");
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, []);

  // Return
  return { users, setUsers, loading, error };
};
