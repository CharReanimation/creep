import React, { useEffect, useState } from "react";
import { checkHealth } from "../API/API_USER";

// CSS
import "./css/HealthStatus.css"

// Health Status
const HealthStatus = () => {
  const [status, setStatus] = useState("Checking...");

  // Check Health
  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const res = await checkHealth();
        if (res.status === "ok") {
          setStatus("User-Service: ✅ Connected! 🦑");
        } else {
          setStatus("User-Service: ⚠️ Error! 💀");
        }
      } catch (err) {
        setStatus("❌ Backend Not Reachable 👻");
      }
    };

    fetchHealth();
  }, []);

  // Return
  return <div className="server-status">{status}</div>;
};

// Export
export default HealthStatus;
