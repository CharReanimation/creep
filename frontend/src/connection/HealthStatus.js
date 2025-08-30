// Hooks
import { useHealthStatus } from "./hooks/Hook_Health";

// CSS
import "./css/HealthStatus.css";

// Health Status
const HealthStatus = () => {
  // State
  const { userStatus, calendarStatus } = useHealthStatus();

  // Return
  return (
    <div className="server-status-body">
      <div className="server-status-container">
        <div>{userStatus}</div>
        <div>{calendarStatus}</div>
      </div>
    </div>
  );
};

// Export
export default HealthStatus;
