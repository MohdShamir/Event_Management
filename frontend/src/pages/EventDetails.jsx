import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../axios";
import { AuthContext } from "../context/AuthContext";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await API.get(`/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        setError("Failed to fetch event details");
      }
    };
    fetchEvent();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await API.delete(`/events/${id}`);
      alert("Event deleted successfully");
      navigate("/events");
    } catch (err) {
      setError("Failed to delete event");
    }
  };

  if (!event) return <p className="text-center mt-10">{error || "Loading..."}</p>;

  const canEditOrDelete = user && (user.role === "admin" || user.id === event.creatorId);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        {event.image && (
          <img
         src={`${process.env.REACT_APP_API_URL}${event.image}`}
            alt={event.title}
            className="w-full h-64 object-cover rounded"
          />
        )}
        <h1 className="text-3xl font-bold mt-4">{event.title}</h1>
        <p className="text-gray-700 mt-2">{event.description}</p>
        <p className="text-sm text-gray-500 mt-2">
          Date: {new Date(event.date).toLocaleDateString()}
        </p>

        {canEditOrDelete && (
          <div className="mt-4 flex space-x-3">
            <button
              onClick={() => navigate(`/events/edit/${event._id}`)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
