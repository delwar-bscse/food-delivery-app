import { FaUsers } from "react-icons/fa6";
import { RiShoppingBag2Fill } from "react-icons/ri";
import { PiCurrencyCircleDollarFill } from "react-icons/pi";
import { GiReceiveMoney } from "react-icons/gi";
import { HiUsers } from "react-icons/hi";
import { Select } from "antd";
import { useState } from "react";

// Sub Component //
const SubComponent = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-2xl py-6 px-8 flex items-center justify-between gap-4 border-2 border-gray-400">
      <div className="flex flex-col items-start gap-2">
        <h2 className="text-center text-2xl text-base">{title}</h2>
        <h3 className="text-center text-2xl font-semibold">
          {value}
        </h3>
      </div>
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
        {icon}
      </div>
    </div>
  );
};

const GeneralStateSection = () => {
  const [duration, setDuration] = useState("all");

  const generalState = {
    totalRevenue: 120,
    totalUsers: 545,
    totalOrders: 320,
    totalSubscribers: 120
  };

  const options = [
    {
      value: 'all',
      label: 'Default',
    },
    {
      value: 'daily',
      label: 'daily',
    },
    {
      value: 'weekly',
      label: 'Weekly',
    },
    {
      value: 'monthly',
      label: 'Monthly',
    },
    {
      value: 'yearly',
      label: 'Yearly',
    },
  ]

  const handleChange = (value) => {
    // console.log(`selected ${value}`);
    setDuration(value);
  };


  return (
    <div>
      <div className="flex justify-between items-center py-2">
        <h2 className="text-3xl font-semibold text-gray-700">Dashboard</h2>
        <Select
          defaultValue={duration}
          style={{
            width: 120,
          }}
          onChange={handleChange}
          options={options}
          size="large"
        />
      </div>
      <div className="grid  grid-cols-4 gap-6">
        <SubComponent title="Total Revenue" value={generalState.totalRevenue} icon={<GiReceiveMoney size={40} className="text-gray-700" />} />
        <SubComponent title="Total Users" value={generalState.totalUsers} icon={<FaUsers size={40} className="text-gray-700" />} />
        <SubComponent title="Total Orders" value={generalState.totalOrders} icon={<RiShoppingBag2Fill size={40} className="text-gray-700" />} />
        <SubComponent title="Total Subscribers" value={generalState.totalSubscribers} icon={<HiUsers size={40} className="text-gray-700" />} />
      </div>
    </div>
  );
};

export default GeneralStateSection;
