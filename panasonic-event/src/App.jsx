// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Verify from "./components/Verify";
import UserDetails from "./components/UserDetails";
import Navbar from "./components/Navbar";
import AdminLogin from "./components/AdminLogin";
import Dashboard from "./components/Dashboard";
import ThankYou from "./components/Thankyou";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/verify/:token" element={<Verify />} />
          <Route path="/user-details" element={<UserDetails />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/thankyou" element={<ThankYou />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
