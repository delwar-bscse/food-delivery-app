import React from "react";
import RatingStatics from "../../components/Analytics/RatingStatics";
import OrderUserStatistics from "../../components/Analytics/OrderUserStatistics";
import AvarageDelivery from "../../components/Analytics/AvarageDelivery";
import ActiveRatedUsers from "./ActiveRatedUsers";
import UserGrowth from "../../components/Analytics/UserGrowth";

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

      <div className="flex gap-6">
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
