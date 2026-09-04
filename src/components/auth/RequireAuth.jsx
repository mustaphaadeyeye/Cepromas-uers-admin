import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores/auth.store";

const RequireAuth = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // Strictly block AGENT or ADMIN roles from entering the user application
  if (user.role !== "USER") {
    logout();
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAuth;
