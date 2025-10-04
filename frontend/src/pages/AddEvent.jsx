import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../axios";

const AddEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null); // ✅ Image state
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("date", date);
      if (image) formData.append("image", image); // ✅ append image if selected

      await API.post("/events", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/events");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add event");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-3"
      >
        <h1 className="text-2xl font-bold mb-4">Add Event</h1>
        {error && <p className="text-red-500 mb-3">{error}</p>}

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          rows="4"
          required
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])} // ✅ handle image selection
          className="w-full border px-3 py-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
