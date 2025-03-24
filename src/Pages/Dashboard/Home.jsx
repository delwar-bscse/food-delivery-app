import React, { useState } from "react";
import TotalRevenue from "../../components/Analytics/TotalRevenue";
import GeneralStateSection from "../../components/Shared/GeneralStateSection";

const Home = () => {
  const [duration, setDuration] = useState("month");
  const [selectPath, setSelectPath] = useState("totalRevenue");
  const [selectState, setSelectState] = useState("Total Revenue");
  

  return (
    <div className="p-6 bg-white rounded-xl space-y-6">
      <GeneralStateSection selectState={selectState} setSelectState={setSelectState} setSelectPath={setSelectPath} />
      <TotalRevenue selectState={selectState} selectPath={selectPath} duration={duration} setDuration={setDuration} />
    </div>
  );
};

export default Home;
