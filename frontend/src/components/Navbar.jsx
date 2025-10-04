import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        EMS
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/events" className="hover:text-gray-300">
          Events
        </Link>

        {user && (
          <>
            {/* Show Add Event button only for logged-in users */}
            <button
              onClick={() => navigate("/add-event")}
              className="bg-green-500 px-3 py-1 rounded hover:bg-green-600 transition"
            >
              Add Event
            </button>

            {/* Dashboard link */}
            <Link to="/dashboard" className="hover:text-gray-300">
              Dashboard
            </Link>

            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}

        {!user && (
          <>
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
            <Link to="/signup" className="hover:text-gray-300">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
