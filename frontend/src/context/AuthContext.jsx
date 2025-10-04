import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("ems_token") || null);

  // ✅ Load user info from localStorage when app starts
  useEffect(() => {
    const savedUser = localStorage.getItem("ems_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // ✅ Login function
  const login = (userData, jwtToken) => {
    localStorage.setItem("ems_user", JSON.stringify(userData));
    localStorage.setItem("ems_token", jwtToken);
    setUser(userData);
    setToken(jwtToken);
  };

  // ✅ Logout function
  const logout = () => {
    localStorage.removeItem("ems_user");
    localStorage.removeItem("ems_token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
