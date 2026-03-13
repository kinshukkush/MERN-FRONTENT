import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user") || "null"); }
    catch { return null; }
  });

  const setUser = useCallback((userData) => {
    setUserState(userData);
    if (userData) localStorage.setItem("user", JSON.stringify(userData));
    else localStorage.removeItem("user");
  }, []);

  const logout = useCallback(() => {
    setUserState(null);
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
  }, []);

  const isAdmin = user?.role === "admin";
  const isLoggedIn = !!user?.token;

  return (
    <AuthContext.Provider value={{ user, setUser, logout, isAdmin, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
