import { useState } from "react";
import { User_Login } from "../../../API/API_USER";

// CSS
import "../../global/css/global_anim.css"
import "./css/Login.css";

// Login
const Login = () => {
  // State
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Hnadle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await User_Login(form);
      alert(data.message);
      localStorage.setItem("token", data.token);
    } catch (err) {
      alert(err.message);
    }
  };

  // Return
  return (
    <div className="login-body anim-fade-in">
      <div className="login-body-container">
        <form className="login-body-form" onSubmit={handleSubmit}>
          <input
            className="login-input"
            name="email"
            type="email"
            placeholder="邮箱"
            onChange={handleChange}
          />
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
