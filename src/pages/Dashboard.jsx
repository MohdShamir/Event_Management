import React, { useEffect, useState, useContext } from 'react';
import API from '../axios';
import { AuthContext } from '../context/AuthContext';
import EventCard from '../components/EventCard';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;

    // Fetch events created by this user
    API.get('/events/mine')
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await API.delete(`/events/${id}`);
      setEvents(events.filter(e => e._id !== id));
    } catch (err) {
      alert("Failed to delete event");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Events</h1>
        <Link
          to="/add-event"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          ➕ Add Event
        </Link>
      </div>

      <div className="flex flex-wrap -m-4 justify-center">
        {events.length > 0 ? (
          events.map(event => (
            <div key={event._id} className="relative">
              <EventCard event={event} />
              <button
                onClick={() => handleDelete(event._id)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">You haven’t created any events yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
