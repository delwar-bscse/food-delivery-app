import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
 
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
 
const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const roleArray = ["ADMIN", "admin", "SUPER_ADMIN", "super_admin"];
 
  useEffect(() => {
    const authToken = localStorage.getItem("ivan_authToken");
 
    if (!authToken) {
      toast.error("You are not authorized to access this. Please login first.");
      navigate("/auth/login", { replace: true, state: { from: location } });
    } else {
      try {
        const decodedToken = jwtDecode(authToken);
 
        const { role } = decodedToken;
 
        if (!role || !roleArray.includes(role)) {
          toast.error("Access denied. Insufficient permissions.");
          navigate("/auth/login", { replace: true, state: { from: location } });
        }
      } catch (error) {
        toast.error("Invalid token. Please login again.");
        localStorage.removeItem("authToken");
        sessionStorage.removeItem("authToken");
        navigate("/auth/login", { replace: true, state: { from: location } });
      }
    }
  }, [navigate, location]);
 
  const authToken = localStorage.getItem("ivan_authToken");
  if (authToken) {
    try {
      const decodedToken = jwtDecode(authToken);
      const { role } = decodedToken;
 
      if ( role || roleArray.includes(role)) {
        return children;
      }
    } catch {
      // Do nothing here; the useEffect already handles invalid tokens
    }
  }
 
  return <Navigate to="/auth/login" />;
};
 
export default PrivateRoute;
 
 