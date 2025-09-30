import React, { useEffect, useState } from 'react';
import API from '../axios';
import EventCard from '../components/EventCard';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/events').then(res => setEvents(res.data));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await API.delete(`/events/${id}`);
    setEvents(events.filter(e => e._id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

      {/* ✅ Add Event Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => navigate('/admin/add-event')}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          ➕ Add New Event
        </button>
      </div>

      <div className="flex flex-wrap -m-4 justify-center">
        {events.map(event => (
          <div key={event._id} className="relative">
            <EventCard event={event} />
            <button
              onClick={() => handleDelete(event._id)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
