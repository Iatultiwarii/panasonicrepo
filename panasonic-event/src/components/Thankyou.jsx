import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ThankYou() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, qrCode, message } = location.state || {};

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = `${user?.name || "user"}_qrcode.png`;
    link.click();
  };

  if (!user) {
    // If accessed directly without data, redirect to home
    navigate("/");
    return null;
  }

  return (
    <div className="container text-center mt-5">
      <h2>{message || "Thank You!"}</h2>
      <p>Here are your details:</p>
      <div className="card p-3 mx-auto" style={{ maxWidth: "400px" }}>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Designation:</strong> {user.designation}</p>
        <p><strong>Company:</strong> {user.company}</p>
        <p><strong>Slot 1:</strong> {user.slot1}</p>
        <p><strong>Slot 2:</strong> {user.slot2}</p>
      </div>

      <div className="mt-4">
        <h5>Your QR Code:</h5>
        <img src={qrCode} alt="QR Code" className="img-fluid mt-2" />
        <br />
        <button className="btn btn-success mt-3" onClick={handleDownload}>
          Download QR Code
        </button>
      </div>
    </div>
  );
}

export default ThankYou;
