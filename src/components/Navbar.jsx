import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      {/* Left side */}
      <div className="flex items-center space-x-4">
        <Link to="/" className="font-bold text-xl">
          EMS
        </Link>

        {/* ✅ Always show Events link */}
        <Link to="/" className="hover:underline">
          Events
        </Link>

        {/* Show when user is logged in */}
        {user && (
          <>
            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <button
              onClick={() => navigate("/add-event")}
              className="bg-green-500 px-3 py-1 rounded hover:bg-green-600 transition"
            >
              ➕ Add Event
            </button>
          </>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {!user ? (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/signup" className="hover:underline">
              Signup
            </Link>
          </>
        ) : (
          <>
            <span>Hi, {user.name}</span>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
