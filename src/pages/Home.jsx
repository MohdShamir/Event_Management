import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to EMS 🚀</h1>
      <p className="text-gray-600 mb-6">Manage your events with ease</p>
      <Link
        to="/events"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        View Events
      </Link>
    </div>
  );
};

export default Home;
