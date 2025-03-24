import { FaUsers } from "react-icons/fa6";
import { RiShoppingBag2Fill } from "react-icons/ri";
import { GiReceiveMoney } from "react-icons/gi";
import { HiUsers } from "react-icons/hi";
import { useGeneralTotalOrdersQuery, useGeneralTotalRevenueQuery, useGeneralTotalSubscribersQuery, useGeneralTotalUsersQuery } from "../../redux/apiSlices/dashboardSlice";

// Sub Component for General State Section//
const SubComponent = ({ title, pathName, value, icon, setSelectState, setSelectPath, selectState }) => {

  const handleClick = (title, pathName) => {
    setSelectState(title);
    setSelectPath(pathName);
  }

  return (
    <div onClick={()=>handleClick(title,pathName)} className={`${selectState === title ? "bg-gray-50" : 'bg-white'} rounded-2xl py-6 px-8 flex items-center justify-between gap-4 border-2 border-gray-200 cursor-pointer`}>
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

{/* ------------------- General State Section ------------------- */}
const GeneralStateSection = ({selectState, setSelectState, setSelectPath}) => {
  const { data: usersData } = useGeneralTotalUsersQuery();
  const { data: ordersData } = useGeneralTotalOrdersQuery();
  const { data: revenueData } = useGeneralTotalRevenueQuery();
  const { data: subscribersData } = useGeneralTotalSubscribersQuery();
  // console.log(usersData?.data?.totalUsers)

  const generalState = {
    totalRevenue: 120,
    totalUsers: 545,
    totalOrders: 320,
    totalSubscribers: 120
  };

  return (
    <div>
      <div className="flex justify-between items-center py-3">
        <h2 className="text-3xl font-semibold text-gray-700 pb-1">Dashboard</h2>
      </div>
      <div className="grid  grid-cols-4 gap-6">
        <SubComponent setSelectState={setSelectState} selectState={selectState} setSelectPath={setSelectPath} title="Total Revenue" pathName="totalRevenue" value={revenueData?.total} icon={<GiReceiveMoney size={40} className="text-gray-700" />} />

        <SubComponent setSelectState={setSelectState} selectState={selectState} setSelectPath={setSelectPath} title="Total Users" pathName="totalUsers" value={usersData?.data?.totalUsers} icon={<FaUsers size={40} className="text-gray-700" />} />

        <SubComponent setSelectState={setSelectState} selectState={selectState} setSelectPath={setSelectPath} title="Total Orders" pathName="totalOrders" value={ordersData?.total} icon={<RiShoppingBag2Fill size={40} className="text-gray-700" />} />

        <SubComponent setSelectState={setSelectState} selectState={selectState} setSelectPath={setSelectPath} title="Total Subscribers" pathName="totalSubscribers" value={subscribersData?.total} icon={<HiUsers size={40} className="text-gray-700" />} />
      </div>
    </div>
  );
};

export default GeneralStateSection;
