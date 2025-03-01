import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="flex">
      {/* side bar */}
      <div className="w-[300px] h-screen bg-[#FFFFFF] overflow-y-auto">
        <Sidebar />
      </div>

      {/* main container with header */}
      <div className="flex-1">
        <div className="h-[68px] flex items-center justify-end pr-5">
          <Header />
        </div>

        <div className="bg-[#F6F6F6] h-[calc(100vh-68px)] overflow-y-auto">
          <div className="h-full overflow-y-auto rounded-md p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
