// User
const API_URL = "http://localhost:5000/api/user-service"; // Local
// const API_URL = "/api/users"; // Docker

// Check Health: Check if Frontend and Backend are connected
export async function checkHealth() {
  return request("/health", "GET");
}

// ---- ---- Admin ---- ----
// Get All Users
export async function Get_All_Users() {
  return request("/admin/users", "GET");
}

// Delete User
export async function Delete_User(userId) {
  return request(`/admin/delete/${userId}`, "DELETE");
}

// ---- ---- User ---- ----
// Register
export async function User_Register(userData) {
  return request("/auth/register", "POST", userData);
}

// Login
export async function User_Login(userData) {
  return request("/auth/login", "POST", userData);
}

// Profile
export async function Get_Profile() {
  return request("/user/profile", "GET");
}

export async function Update_Profile(data) {
  return request("/user/profile", "PUT", data);
}

// Request User
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
