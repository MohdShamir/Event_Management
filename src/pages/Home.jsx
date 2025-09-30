import React, { useEffect, useState, useContext } from 'react';
import API from '../axios';
import EventCard from '../components/EventCard';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const [events, setEvents] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    API.get('/events')
      .then(res => setEvents(res.data))
      .catch(err => console.error("Failed to fetch events:", err));
  }, []);

  const handleBook = async (eventId) => {
    if (!user) return alert('Please login to book');
    try {
      await API.post('/bookings', { eventId });
      alert('Event booked successfully!');
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Upcoming Events</h1>

      {events.length === 0 ? (
        <p className="text-center text-gray-600">No events available right now.</p>
      ) : (
        <div className="flex flex-wrap -m-4 justify-center">
          {events.map(event => (
            <EventCard key={event._id} event={event} onBook={handleBook} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
