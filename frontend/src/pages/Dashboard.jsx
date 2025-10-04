import React, { useEffect, useState, useContext } from "react";
import API from "../axios";
import { AuthContext } from "../context/AuthContext";
import EventCard from "../components/EventCard";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/events");
        // Optionally filter events by creator if you want dashboard to show only user’s events
        const myEvents = res.data.filter((e) => e.creatorId === user?.id);
        setEvents(myEvents);
      } catch (err) {
        setError("Failed to load events");
      }
    };
    fetchEvents();
  }, [user]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">My Dashboard</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
