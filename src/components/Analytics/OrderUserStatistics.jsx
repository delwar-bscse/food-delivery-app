import { useState } from "react";
import DurationSelect from "../../DurationSelect";
import { useAverageDeliveryTimeQuery, useUserAnalyticsQuery } from "../../redux/apiSlices/analyticsSlice";

const OrderUserStatistics = () => {
  const [durationUser, setDurationUser] = useState({
    year: new Date().getFullYear(),
    month: null,
    day: null,
  });

  const { data: userStates, isLoading: isUserLoading, isSuccess: isUserSuccess } = useUserAnalyticsQuery({
    year: durationUser?.year,
    month: durationUser?.month || "",
    day: durationUser?.day || "",
  });

  const { data: datas } = useAverageDeliveryTimeQuery();
  // console.log("Average Delivery", datas);

  const orderState = {
    totalOrders: 1003,
    averageOrdersPerUser: 4,
    averageDeliveryTime: "20 minutes",
    deliveryCompleteRate: "90%",
    canceledOrders: "10%"
  };



  return (
    <div className="overflow-x-auto space-y-6">
      <table className="min-w-full table-auto border-collapse">
        <tbody>
          <tr>
            <td className="px-4 py-3 border">Total Orders</td>
            <td className="px-4 py-3 border">{datas?.pagination?.totalParcels}</td>
          </tr>
          <tr>
            <td className="px-4 py-3 border">Average Orders Per User</td>
            <td className="px-4 py-3 border">{datas?.data?.averageOrdersPerUser}</td>
          </tr>
        </tbody>
      </table>
      <table className="min-w-full table-auto border-collapse">
        <tbody>
          <tr className="">
            <th className="px-4 py-3 border text-gray-700 space-x-4" colSpan={2}>
              <span className="text-xl font-semibold">Users Analytics</span>
              <DurationSelect duration={durationUser} setDuration={setDurationUser} />
            </th>
          </tr>
          <tr>
            <td className="px-4 py-3 border">Registered Users</td>
            <td className="px-4 py-3 border">{userStates?.totalUsers}</td>
          </tr>
          <tr>
            <td className="px-4 py-3 border">Active Users</td>
            <td className="px-4 py-3 border">{userStates?.activeUsers}</td>
          </tr>
          <tr>
            <td className="px-4 py-3 border">New Users</td>
            <td className="px-4 py-3 border">{userStates?.newUsers}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderUserStatistics;
