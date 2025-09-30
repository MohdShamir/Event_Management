import React, { createContext, useState, useEffect } from "react";
import API from "../axios"; // your axios instance pointing to backend
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("ems_user");
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("ems_token") || null);

  useEffect(() => {
    if (user) localStorage.setItem("ems_user", JSON.stringify(user));
    else localStorage.removeItem("ems_user");

    if (token) localStorage.setItem("ems_token", token);
    else localStorage.removeItem("ems_token");
  }, [user, token]);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await API.post("/auth/login", { email, password });
      setUser(res.data.user);
      setToken(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      throw err;
    }
  };

  // Signup function
  const signup = async (name, email, password) => {
    try {
      const res = await API.post("/auth/signup", { name, email, password });
      setUser(res.data.user);
      setToken(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("ems_user");
    localStorage.removeItem("ems_token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
