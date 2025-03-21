import React, { useState } from "react";

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

  const userState = {
    registeredUsers: 2000,
    activeUsers: 1959,
    newUsers: 50
  };
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
            <th className="px-4 py-2 border text-gray-700">Orders Statistic</th>
            <th className="px-4 py-2 border text-gray-700">
              <select
                value={timeRangeOrder}
                onChange={handleOrderState}
                className=" border-none ring-0 outline-none rounded px-2 w-[90%] focus:border-none focus:ring-0 focus:outline-none"
              >
                <option value="All">All</option>
                <option value="Day">Day</option>
                <option value="Week">Week</option>
                <option value="Month">Month</option>
                <option value="Year">Year</option>
              </select>
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
            <th className="px-4 py-2 border text-gray-700">Users Analytics</th>
            <th className="px-4 py-2 border text-gray-700">
              <select
                value={timeRangeUser}
                onChange={handleUserState}
                className=" border-none ring-0 outline-none rounded px-2 w-[90%] focus:border-none focus:ring-0 focus:outline-none"
              >
                <option value="All">All</option>
                <option value="Day">Day</option>
                <option value="Week">Week</option>
                <option value="Month">Month</option>
                <option value="Year">Year</option>
              </select>
            </th>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Registered Users</td>
            <td className="px-4 py-2 border">{userState.registeredUsers}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Active Users</td>
            <td className="px-4 py-2 border">{userState.activeUsers}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">New Users</td>
            <td className="px-4 py-2 border">{userState.newUsers}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderUserStatistics;
