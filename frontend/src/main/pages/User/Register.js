import { useState } from "react";
import { User_Register } from "../../../API/API_USER";

// CSS
import "./css/Register.css";

// Register
const Register = () => {
  // State
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [passwordRepetition, setPasswordRepetition] = useState("");

  // Email Validation
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Password Validation
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    return regex.test(password);
  };

  // Password Repetition
  const validatePasswordRepetition = (password, passwordRepetition) => {
    return password === passwordRepetition;
  };

  // Handle Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Empty
    if(!form.username || !form.email || !form.password || !passwordRepetition) {
      alert("请填写完整信息");
      return;
    }

    // Validation
    if (!form.username) {
      alert("用户名不能为空");
      return;
    }

    if (!validateEmail(form.email)) {
      alert("邮箱格式不正确");
      return;
    }

    if (!validatePassword(form.password)) {
      alert("密码必须至少6位，包含1个大写字母和1个特殊字符");
      return;
    }

    if (!validatePasswordRepetition(form.password, passwordRepetition)) {
      alert("两次输入的密码不一致");
      return;
    }

    try {
      const data = await User_Register(form); //
      alert(data.message);
    } catch (err) {
      alert(err.message);
    }
  };

  // Return
  return (
    <div className="register-body anim-fade-in">
      <div className="register-body-container">
        <form className="register-body-form" onSubmit={handleSubmit}>
          {/* Username */}
          <input
            className="register-input"
            name="username"
            type="text"
            placeholder="用户名"
            onChange={handleChange}
          />
          {/* Email */}
          <input
            className="register-input"
            name="email"
            type="email"
            placeholder="邮箱"
            onChange={handleChange}
          />
          {/* Password */}
          <input
            className="register-input"
            name="password"
            type="password"
            placeholder="密码: 至少6位，包含1个大写字母和1个特殊字符"
            onChange={handleChange}
          />
          {/* Password Repetition */}
          <input
            className="register-input"
            type="password"
            placeholder="重复输入密码"
            value={passwordRepetition}
            onChange={(e) => setPasswordRepetition(e.target.value)}
          />
          <button type="submit" className="register-button">
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
};

// Export
export default Register;
