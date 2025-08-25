// User
const API_URL = "http://localhost:5000/api"; // Local
// const API_URL = "/api/users"; // Docker

// Check Health: Check if Frontend and Backend are connected
export async function checkHealth() {
  return request("/health", "GET");
}

// Register
export async function User_Register(userData) {
  return request("/register", "POST", userData);
}

// Login
export async function User_Login(userData) {
  return request("/login", "POST", userData);
}

// Profile
export async function getProfile() {
  return request("/profile", "GET");
}

// Request User
async function request(path, method = "GET", body) {
  const headers = { "Content-Type": "application/json" };

  // Token
  const token = localStorage.getItem("token");
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || "Failed to request");
  }

  return res.json();
}
