import React from "react";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-80">
      {/* ✅ Event Image */}
      {event.image && (
        <img
          src={`http://localhost:5000${event.image}`}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
      )}

      {/* ✅ Event Info */}
      <div className="p-4">
        <h2 className="text-xl font-semibold">{event.title}</h2>
        <p className="text-gray-600 text-sm mt-2 line-clamp-3">
          {event.description}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          📅 {new Date(event.date).toLocaleDateString()}
        </p>

        {/* ✅ View Details Button */}
        <button
          onClick={() => navigate(`/events/${event._id}`)}
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default EventCard;
