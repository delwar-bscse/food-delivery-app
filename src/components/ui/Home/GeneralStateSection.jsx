import { FaUsers } from "react-icons/fa6";
import { RiShoppingBag2Fill } from "react-icons/ri";
import { PiCurrencyCircleDollarFill } from "react-icons/pi";
import { GiReceiveMoney } from "react-icons/gi";
import salongoLogo from "../../../assets/salon-go-logo.png";

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

  const generalState = {
    totalTransections: 252,
    totalUsers: 545,
    totalOrders: 320,
    newUsers: 245,
    newSubscribers: 120,
    totalRevenue: 120,
    newTransections: 252,
  };


  return (
    <div className="grid  grid-cols-4 gap-6">
      <div className=" col-span-3 grid md:grid-cols-3 gap-6">
        <SubComponent title="Total Transections" value={generalState.totalTransections} icon={<PiCurrencyCircleDollarFill size={40} className="text-gray-700" />} />
        <SubComponent title="Total Users" value={generalState.totalUsers} icon={<FaUsers size={40} className="text-gray-700" />} />
        <SubComponent title="Total Orders" value={generalState.totalOrders} icon={<RiShoppingBag2Fill size={40} className="text-gray-700" />} />
        <SubComponent title="New Users" value={generalState.newUsers} icon={<GiReceiveMoney size={40} className="text-gray-700" />} />
        <SubComponent title="New Subscribers" value={generalState.newSubscribers} icon={<GiReceiveMoney size={40} className="text-gray-700" />} />
        <SubComponent title="New Transactions" value={generalState.newTransections} icon={<GiReceiveMoney size={40} className="text-gray-700" />} />
      </div>
      <div className="bg-white rounded-2xl py-6 px-8 border-2 border-gray-400">
        <div className="">
          <h2 className="text-2xl text-base">Total Revenue</h2>
        </div>
      </div>
    </div>
  );
};

export default GeneralStateSection;
