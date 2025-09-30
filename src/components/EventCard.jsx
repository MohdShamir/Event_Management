import React from 'react';

const EventCard = ({ event, onBook }) => (
  <div className="bg-white shadow-md rounded-lg p-4 m-4 w-80">
    <h2 className="text-xl font-bold mb-2">{event.title}</h2>
    <p className="text-gray-600">{event.description}</p>
    <p className="text-gray-500">📅 {new Date(event.date).toLocaleDateString()}</p>
    <p className="text-gray-500">📍 {event.location}</p>

    {onBook && (
      <button
        onClick={() => onBook(event._id)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Book Now
      </button>
    )}
  </div>
);

export default EventCard;
