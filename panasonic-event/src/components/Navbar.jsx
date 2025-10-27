// src/components/Navbar.jsx
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">UserVerify</Link>
      <div className="navbar-nav">
        <Link className="nav-link" to="/">Add User</Link>
        <Link className="nav-link" to="/users">User List</Link>
      </div>
    </nav>
  );
};

export default Navbar;
