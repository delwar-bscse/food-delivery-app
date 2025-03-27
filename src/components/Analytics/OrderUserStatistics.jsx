import React, { useState } from "react";
import App from "../../demo";
import { useUserAnalyticsQuery } from "../../redux/apiSlices/analyticsSlice";

const OrderUserStatistics = () => {
  const [timeRangeOrder, setTimeRangeOrder] = useState("All");
  const [timeRangeUser, setTimeRangeUser] = useState("All");

  const orderState = {
    totalOrders: 1003,
    averageOrdersPerUser: 4,
    averageDeliveryTime: "20 minutes",
    deliveryCompleteRate: "90%",
    canceledOrders: "10%"
  };

  const { data: userStates , isLoading: isUserLoading, isSuccess: isUserSuccess} = useUserAnalyticsQuery({
    year: 2021,
    month: 11,
    day: 15
  });
  // console.log("User Analytics", userStates);

  
  const handleUserState = (e) => {
    setTimeRangeUser(e.target.value);
    console.log(e.target.value);
  };
  const handleOrderState = (e) => {
    setTimeRangeOrder(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="overflow-x-auto">

      <table className="min-w-full table-auto border-collapse">
        <tbody>
          <tr className="">
            <th className="px-4 py-2 border text-gray-700 space-x-4" colSpan={2}>
              <span className="text-xl font-semibold">Orders Statistics</span>
              <App />
            </th>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Total Orders</td>
            <td className="px-4 py-2 border">{orderState.totalOrders}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Average Orders Per User</td>
            <td className="px-4 py-2 border">{orderState.averageOrdersPerUser}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Average Delivery Time</td>
            <td className="px-4 py-2 border">{orderState.averageDeliveryTime}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Delivery Complete Rate</td>
            <td className="px-4 py-2 border">{orderState.deliveryCompleteRate}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Canceled Orders</td>
            <td className="px-4 py-2 border">{orderState.canceledOrders}</td>
          </tr>
          <tr className="">
            <th className="px-4 py-2 border text-gray-700 space-x-4" colSpan={2}>
              <span className="text-xl font-semibold">Users Analytics</span>
              <App />
            </th>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Registered Users</td>
            <td className="px-4 py-2 border">{userStates?.totalUsers}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Active Users</td>
            <td className="px-4 py-2 border">{userStates?.activeUsers}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">New Users</td>
            <td className="px-4 py-2 border">{userStates?.newUsers}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderUserStatistics;
