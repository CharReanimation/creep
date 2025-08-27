import { useContext, useState } from "react"; // React
import { useNavigate } from "react-router-dom";

// API
import { User_Login } from "../../../API/API_USER";

// Base Route
import { USER, ADMIN } from "../../../Base_Route"; // Base Route

// Components
import { AuthContext } from "../../../main/components/context/AuthContext";

// CSS
import "../../global/css/global_anim.css";
import "./css/Login.css";

// Login
const Login = () => {
  // State
  const navigate = useNavigate(); // Nav
  const { login } = useContext(AuthContext); // Auth Context
  const [form, setForm] = useState({ email: "", password: "" });

  // Handle Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Hnadle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await User_Login(form);
      alert(data.message);

      // Save Token
      login(data.token);

      // Navigate to Dashboard
      navigate(`${USER}/dashboard`);
    } catch (err) {
      alert(err.message);
    }
  };

  // Return
  return (
    <div className="login-body anim-fade-in">
      <div className="login-body-container">
        <form className="login-body-form" onSubmit={handleSubmit}>
          {/* Email */}
          <input
            className="login-input"
            name="email"
            type="email"
            placeholder="邮箱"
            onChange={handleChange}
          />
          {/* Password */}
          <input
            className="login-input"
            name="password"
            type="password"
            placeholder="密码"
            onChange={handleChange}
          />
          <button type="submit" className="login-button">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

// Export
export default Login;
