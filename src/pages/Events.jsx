import React, { useEffect, useState } from "react";
import API from "../axios";
import EventCard from "../components/EventCard";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/events");
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">All Events</h1>
      <div className="flex flex-wrap -m-4 justify-center">
        {events.length > 0 ? (
          events.map((event) => <EventCard key={event._id} event={event} />)
        ) : (
          <p className="text-gray-600">No events available.</p>
        )}
      </div>
    </div>
  );
};

export default Events;
