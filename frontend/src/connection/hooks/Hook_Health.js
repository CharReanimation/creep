import { useEffect, useState } from "react"; // React

// API
import { UserServiceCheckHealth } from "../../API/API_USER";
import { CalendarServiceCheckHealth } from "../../API/API_CALENDAR";

export const useHealthStatus = () => {
  const [userStatus, setUserStatus] = useState("Checking...");
  const [calendarStatus, setCalendarStatus] = useState("Checking...");

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const [resUser, resCalendar] = await Promise.all([
          UserServiceCheckHealth(),
          CalendarServiceCheckHealth(),
        ]);

        // User Service
        if (resUser.status === "ok") {
          setUserStatus("User-Service: ✅ Connected! 🦑");
        } else {
          setUserStatus("User-Service: ⚠️ Error! 💀");
        }

        // Calendar Service
        if (resCalendar.status === "ok") {
          setCalendarStatus("Calendar-Service: ✅ Connected! 📅");
        } else {
          setCalendarStatus("Calendar-Service: ⚠️ Error! 💀");
        }
      } catch (err) {
        // Not Reachable
        setUserStatus("User-Service: ❌ Backend Not Reachable 👻");
        setCalendarStatus("Calendar-Service: ❌ Backend Not Reachable 😱");
      }
    };

    fetchHealth();
  }, []);

  return { userStatus, calendarStatus };
};
