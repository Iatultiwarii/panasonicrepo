// src/components/AdminLogin.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Check if admin is already logged in
  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (adminLoggedIn) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  
    const ADMIN_USERNAME = "admin@gmail.com";
    const ADMIN_PASSWORD = "admin123";

    if (
      credentials.username === ADMIN_USERNAME &&
      credentials.password === ADMIN_PASSWORD
    ) {
      localStorage.setItem("isAdminLoggedIn", "true");
      navigate("/dashboard");
    } else {
      setMessage("Invalid username or password");
    }
  };

  return (
    <div className="card p-4 shadow">
      <h3 className="text-center mb-3">Admin Login</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            className="form-control"
            onChange={handleChange}
            placeholder="Enter admin username"
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            className="form-control"
            onChange={handleChange}
            placeholder="Enter admin password"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>

      {message && <p className="mt-3 text-danger text-center">{message}</p>}
    </div>
  );
};

export default AdminLogin;
