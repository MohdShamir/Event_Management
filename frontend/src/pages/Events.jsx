import React, { useEffect, useState, useContext } from "react";
import API from "../axios";
import EventCard from "../components/EventCard";
import { AuthContext } from "../context/AuthContext";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const { user, token } = useContext(AuthContext);

  // Fetch events from backend
  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");
      setEvents(res.data);
    } catch (err) {
      setError("Failed to fetch events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Delete event
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await API.delete(`/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(events.filter((event) => event._id !== id));
      alert("Event deleted successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete event");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">All Events</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="flex flex-wrap gap-6 justify-center">
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onDelete={handleDelete}
              user={user} // pass user to control edit/delete in EventCard if needed
            />
          ))
        ) : (
          <p className="text-gray-600">No events found.</p>
        )}
      </div>
    </div>
  );
};

export default Events;
