import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../axios";

const EventCard = ({ event, onDelete }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Only admin or creator can edit/delete
  const canEditOrDelete = user && (user.role === "admin" || user.id === event.creatorId);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await API.delete(`/events/${event._id}`);
      if (onDelete) onDelete(event._id);
      alert("Event deleted successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete event");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-80">
      {event.image && (
        <img
          src={`http://localhost:5000${event.image}`}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-4">
        <h2 className="text-xl font-semibold">{event.title}</h2>
        <p className="text-gray-600 text-sm mt-2 line-clamp-3">
          {event.description}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          📅 {new Date(event.date).toLocaleDateString()}
        </p>

        {/* View Details */}
        <button
          onClick={() => navigate(`/events/${event._id}`)}
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          View Details
        </button>

        {/* Edit/Delete buttons */}
        {canEditOrDelete && (
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => navigate(`/events/edit/${event._id}`)}
              className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
