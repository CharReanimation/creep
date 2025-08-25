import { useNavigate } from "react-router-dom";

// Hooks
import { useGetProfile } from "./hooks/Hook_User";

// CSS
import "../../global/css/global_anim.css";
import "./css/Dashboard.css";

// Dashboard
const Dashboard = () => {
  // Nav
  const navigate = useNavigate();

  // State
  const { user, loading } = useGetProfile();

  // DOM Render
  if (loading) {
    return <div className="dashboard-loading">加载中...</div>;
  }

  if (!user) {
    return <div className="dashboard-error">未能获取用户信息</div>;
  }

  // Return
  return (
    <div className="dashboard-body">
      <h1 className="anim-fade-in">欢迎回来，{user.username} 👋</h1>
      {/* Dashboard Card */}
      <div className="dashboard-card anim-down-to-up">
        {/* Dashboard Avatar */}
        <div className="dashboard-avatar">
          {user.profile?.avatar ? (
            <img src={user.profile.avatar} alt="Avatar" />
          ) : (
            <div className="avatar-placeholder">无头像</div>
          )}
        </div>

        {/* Dashboard Info */}
        <div className="dashboard-info">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>角色:</strong> {user.roles.join(", ")}
          </p>
          <p>
            <strong>简介:</strong> {user.profile?.bio || "暂无"}
          </p>
          <p>
            <strong>位置:</strong> {user.profile?.location || "未知"}
          </p>
          <p>
            <strong>注册时间:</strong>{" "}
            {new Date(user.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      {/* Edit Button */}
      <button
        className="dashboard-button anim-fade-in"
        onClick={() => navigate("/user/dashboard/edit")}
      >
        Edit Profile
      </button>
    </div>
  );
};

// Export
export default Dashboard;
