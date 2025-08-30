// Calendar API
const API_URL = "http://localhost:5001/api/calendar-service"; // Local
// const API_URL = "/api/calendar"; // Docker

// Check Health: Check if Frontend and Backend are connected
export async function CalendarServiceCheckHealth() {
  return request("/health", "GET");
}

// ---- ---- Calendar ---- ----
// Get All Events
export async function Get_All_Events(userId) {
  const query = userId ? `?userId=${userId}` : "";
  return request(`/events${query}`, "GET");
}

// Add Event
export async function Add_Event(eventData) {
  return request("/events", "POST", eventData);
}

// Update Event
export async function Update_Event(eventId, eventData) {
  return request(`/events/${eventId}`, "PUT", eventData);
}

// Delete Event
export async function Delete_Event(eventId) {
  return request(`/events/${eventId}`, "DELETE");
}

// ---- ---- ---- ---- Request ---- ---- ---- ----
async function request(path, method = "GET", body) {
  // Header
  const headers = { "Content-Type": "application/json" };

  // Token
  const token = localStorage.getItem("token");
  if (token) headers["Authorization"] = `Bearer ${token}`;

  // Request
  const res = await fetch(`${API_URL}${path}`, {
    method, // GET, POST, PUT, DELETE
    headers, // Content-Type: application/json, Authorization: Bearer token
    body: body ? JSON.stringify(body) : undefined,
  });

  // Check if Success
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw {
      status: res.status,
      code: error.code || res.status,
      message: error.error || "Failed to request",
    };
  }

  // Return
  return res.json();
}
