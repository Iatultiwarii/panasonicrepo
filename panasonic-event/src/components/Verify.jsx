// src/pages/Verify.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Verify = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await axios.get(`http://localhost:5000/api/users/verify/${token}`);
        setStatus("✅ Your email has been verified successfully!");
      } catch (err) {
        setStatus("❌ Verification link is invalid or expired.");
      }
    };
    verifyUser();
  }, [token]);

  return (
    <div className="text-center mt-5">
      <h4>{status}</h4>
    </div>
  );
};

export default Verify;
