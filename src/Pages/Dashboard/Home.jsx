import React, { useState } from "react";
import GeneralStateSection from "../../components/ui/Home/GeneralStateSection";
import TotalRevenue from "../../components/ui/Analytics/TotalRevenue";

const Home = () => {
  const [duration, setDuration] = useState("month");
  const [selectState, setSelectState] = useState("Total Revenue");

  return (
    <div className="p-6 bg-white rounded-xl space-y-6">
      <GeneralStateSection selectState={selectState} setSelectState={setSelectState} />
      <TotalRevenue selectState={selectState} duration={duration} setDuration={setDuration} />
    </div>
  );
};

export default Home;
