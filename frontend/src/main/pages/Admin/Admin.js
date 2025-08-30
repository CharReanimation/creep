import React, { useState, useContext } from "react"; // React

// Auth
import { AuthContext } from "../../../main/components/context/AuthContext";

// Hooks
import { useGetAllUsers } from "./hooks/Hook_Admin";

// Handlers
import { HandleDeleteUser } from "./handlers/Handler_Admin";

// CSS
import "../../global/css/global_btn.css";
import "../../global/css/global_anim.css";
import "./css/Admin.css";

// Admin
const Admin = () => {
  // State
  const { user } = useContext(AuthContext); // Auth Context
  const { users, setUsers, loading, error } = useGetAllUsers(); // Get All Users

  // Pages
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10; // 每页显示的用户数

  // Slice
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Delete User
  const deleteUser = async (id) => {
    if (id === user?.id || id === user?._id) {
      alert("🤣 不能删除自己！");
      return;
    }
    const success = await HandleDeleteUser(id);
    if (success) {
      setUsers(users.filter((u) => u._id !== id)); // Update
      alert("✅ 用户删除成功！");
    }
  };

  // Loading
  if (loading) return <p className="admin-container">正在加载用户列表...</p>;

  // Error
  if (error) return <p className="admin-container error">{error}</p>;

  return (
    <div className="admin-body">
      <div className="admin-container">
        <table className="admin-table anim-fade-in">
          <thead>
            <tr>
              <th>用户名</th>
              <th>Email</th>
              <th>角色</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((u) => (
              <tr key={u._id}>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.roles.join(", ")}</td>
                <td>{new Date(u.createdAt).toLocaleString()}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteUser(u._id)}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="admin-container">
        {/* Page Slice */}
        <div className="admin-pagination-container">
          <div className="pagination">
            <button
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              上一页
            </button>
            <span className="pagination-info">
              {currentPage} / {totalPages}
            </span>
            <button
              className="pagination-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              下一页
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export
export default Admin;
