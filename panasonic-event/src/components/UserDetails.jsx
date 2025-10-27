import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const UserDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, email } = location.state || {};

  const [form, setForm] = useState({
    name: name || "",
    email: email || "",
    designation: "",
    company: "",
    slot1: "",
    slot2: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    console.log("🚀 Submitting form data:", form);

    try {
      const res = await axios.post("http://localhost:5000/api/users/details", form);

      console.log("✅ Server response:", res.data);

      const { message, user, qrCode } = res.data;

      // Verify that we got data
      if (!user || !qrCode) {
        console.warn("⚠️ Missing user or qrCode in response");
      }

      console.log("🔄 Navigating to /thankyou with:", { user, qrCode, message });
      navigate("/thankyou", { state: { user, qrCode, message } });
    } catch (err) {
      console.error("❌ Error submitting form:", err);
      setMessage(err.response?.data?.message || "Failed to save details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-4 shadow mt-5 mx-auto" style={{ maxWidth: "500px" }}>
      <h3 className="mb-3 text-center">Complete Your Details</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            className="form-control"
            readOnly
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            className="form-control"
            readOnly
          />
        </div>

        <div className="mb-3">
          <label>Designation</label>
          <input
            type="text"
            name="designation"
            value={form.designation}
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Company</label>
          <input
            type="text"
            name="company"
            value={form.company}
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Slot 1</label>
          <select
            name="slot1"
            value={form.slot1}
            className="form-control"
            onChange={handleChange}
            required
          >
            <option value="">Select Slot 1</option>
            <option value="9:00-10:00">9:00-10:00</option>
            <option value="10:00-11:00">10:00-11:00</option>
            <option value="11:00-12:00">11:00-12:00</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Slot 2</label>
          <select
            name="slot2"
            value={form.slot2}
            className="form-control"
            onChange={handleChange}
            required
          >
            <option value="">Select Slot 2</option>
            <option value="13:00-14:00">13:00-14:00</option>
            <option value="14:00-15:00">14:00-15:00</option>
            <option value="15:00-16:00">15:00-16:00</option>
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Details"}
        </button>
      </form>

      {message && <p className="mt-3 text-center text-danger">{message}</p>}
    </div>
  );
};
export default UserDetails;
