import React from "react";
import { Outlet } from "react-router-dom";
import backgroundImage from "../../assets/salonGoLoginBg.png";

const Auth = () => {
  return (
    <div
      className="w-full flex items-center justify-center relative"
      style={{
        height: "100vh",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          padding: 30,
          borderRadius: 10,
          width: 510,
          position: "relative",
          zIndex: 2,
        }}
        className="shadow-custom-card"
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
