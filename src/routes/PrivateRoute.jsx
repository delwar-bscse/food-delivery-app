import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
// import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const adminRole = localStorage.getItem("adminRole");

    if (!adminRole) {
      toast.error("You are not authorized to access this. Please login first.");
      navigate("/auth/login", { replace: true, state: { from: location } });
    } else {
      try {
        // const decodedToken = jwtDecode(authToken);

        // const { role } = decodedToken;

        if (!adminRole || (adminRole !== "admin")) {
          toast.error("Access denied. Insufficient permissions.");
          navigate("/auth/login", { replace: true, state: { from: location } });
        }
      } catch (error) {
        toast.error("Invalid token. Please login again.");
        localStorage.removeItem("adminRole");
        navigate("/auth/login", { replace: true, state: { from: location } });
      }
    }
  }, [navigate, location]);

  const adminRole = localStorage.getItem("adminRole");
  if (adminRole) {
    try {
      // const decodedToken = jwtDecode(authToken);
      // const { role } = decodedToken;

      if (adminRole === "admin") {
        return children;
      }
    } catch {
      toast.error("Invalid token. Please login again.");
    }
  }

  return <Navigate to="/auth/login" />;
};

export default PrivateRoute;
