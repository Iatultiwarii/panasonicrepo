import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "" });
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: register, 2: verify OTP
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/users/register", form, {
        headers: { "Content-Type": "application/json" },
      });
      setMessage(res.data.message || "OTP sent successfully!");
      setStep(2); // move to OTP verification
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/users/verify-otp", {
        email: form.email,
        otp,
      });

      if (res.data.success) {
        setMessage("OTP verified! Proceed to complete your profile.");
        navigate("/user-details", { state: { name: form.name, email: form.email } });
        setStep(3);
      } else {
        setMessage("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="card p-4 shadow">
      <h3 className="mb-3 text-center">
        {step === 1 ? "Register User" : step === 2 ? "Verify OTP" : "Complete Details"}
      </h3>

      {step === 1 && (
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              className="form-control"
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              className="form-control"
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Send OTP
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOtp}>
          <div className="mb-3">
            <label>Enter OTP</label>
            <input
              type="text"
              name="otp"
              value={otp}
              className="form-control"
              onChange={handleOtpChange}
              placeholder="Enter OTP"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Verify OTP
          </button>
        </form>
      )}

      {step === 3 && (
        <div>
          <p className="text-center">User verified! Render your user details form here.</p>
        </div>
      )}

      {message && <p className="mt-3 text-center text-info">{message}</p>}
    </div>
  );
};

export default Register;
