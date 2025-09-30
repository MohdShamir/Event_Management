import React, { useState, useContext } from "react";
import API from "../axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/signup", form); // 👈 fixed path
      localStorage.setItem("ems_token", res.data.token);
      localStorage.setItem("ems_user", JSON.stringify(res.data.user));
      login(form.email, form.password); // update context
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full mb-3 p-2 border rounded" />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full mb-3 p-2 border rounded" />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full mb-3 p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
