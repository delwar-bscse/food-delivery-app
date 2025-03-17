import React from "react";
import SalesTrackingChart from "../../components/ui/Home/SalesTrackingChart";
import RunningOrdersTable from "../../components/ui/Home/RunningOrdersTable";
import rentMeLogo from "../../assets/navLogo.png";
import UserEngagement from "../../components/ui/Home/UserEngagement";
import GeneralStateSection from "../../components/ui/Home/GeneralStateSection";
import Professionals from "../../components/ui/Home/Professionals";
import TotalEarning from "../../components/ui/Analytics/TotalEarning1";
import RunningOrders from "../../components/ui/Analytics/RunningOrders";

const Home = () => {
  const orderSummary = {
    doneByProfessionals: 65,
    doneByFreelancers: 35,
  };

  const isLoading = false;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={rentMeLogo} alt="" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl">
      <GeneralStateSection />
      <div className="md:flex w-full items-center gap-6 mt-6">
        <TotalEarning />
      </div>
      {/* <div className="md:flex w-full items-center gap-6 mt-6">
        <RunningOrders />
      </div> */}
    </div>
  );
};

export default Home;
