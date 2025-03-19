import React from "react";
import SalesTrackingChart from "../../components/ui/Home/SalesTrackingChart";
import RunningOrdersTable from "../../components/ui/Home/RunningOrdersTable";
import rentMeLogo from "../../assets/navLogo.png";
import UserEngagement from "../../components/ui/Home/UserEngagement";
import GeneralStateSection from "../../components/ui/Home/GeneralStateSection";
import Professionals from "../../components/ui/Home/Professionals";
import TotalEarning from "../../components/ui/Analytics/TotalRevenue";
import RunningOrders from "../../components/ui/Analytics/RunningOrders";
import OrderStatistics from "../../components/Shared/OrderStatistics";
import RatingStatics from "../../components/ui/Analytics/RatingStatics";
import ActivityPerformance from "../../components/ui/Analytics/AvarageDelivery";
import UserStatistics from "../../components/Shared/UserStatistics";
import OrderUserStatistics from "../../components/ui/Analytics/OrderUserStatistics";
import AvarageDelivery from "../../components/ui/Analytics/AvarageDelivery";
import ActiveRatedUsers from "./ActiveRatedUsers";
import UserGrowth from "../../components/ui/Analytics/UserGrowth";

const Analytics = () => {
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
    <div className="p-6 bg-white">
      {/* <GeneralStateSection /> */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <OrderUserStatistics />
        </div>
        <div>
          <AvarageDelivery />
        </div>
      </div>
      <div className="md:flex w-full items-center gap-6 mt-6">
      </div>

      <div className="flex gap-4">
        <div className="basis-1/4">
          <RatingStatics />
        </div>
        <div className="basis-3/4">
          <UserGrowth />
        </div>
      </div>
      <div className="">
        <ActiveRatedUsers />
      </div>
    </div>
  );
};

export default Analytics;
