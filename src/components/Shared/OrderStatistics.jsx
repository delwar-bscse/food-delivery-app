import React, { useState } from "react";

const OrderStatistics = () => {
  // State for selected time range
  const [timeRange, setTimeRange] = useState("All");

  // Data for different time ranges
  const data = {
    All: {
      totalOrders: 1003,
      averageOrdersPerUser: 4,
      averageDeliveryTime: "20 minutes",
      deliveryCompleteRate: "90%",
      canceledOrders: "10%"
    },
    Day: {
      totalOrders: 30,
      averageOrdersPerUser: 3,
      averageDeliveryTime: "15 minutes",
      deliveryCompleteRate: "85%",
      canceledOrders: "5%"
    },
    Week: {
      totalOrders: 210,
      averageOrdersPerUser: 5,
      averageDeliveryTime: "18 minutes",
      deliveryCompleteRate: "88%",
      canceledOrders: "7%"
    },
    Month: {
      totalOrders: 900,
      averageOrdersPerUser: 6,
      averageDeliveryTime: "19 minutes",
      deliveryCompleteRate: "92%",
      canceledOrders: "6%"
    },
    Year: {
      totalOrders: 12000,
      averageOrdersPerUser: 10,
      averageDeliveryTime: "21 minutes",
      deliveryCompleteRate: "93%",
      canceledOrders: "8%"
    }
  };

  // Function to handle the selection change
  const handleSelectionChange = (e) => {
    setTimeRange(e.target.value);
  };

  // Current data based on selection
  const selectedData = data[timeRange];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="">
            <th className="px-4 py-2 border text-gray-700">Orders Statistic</th>
            <th className="px-4 py-2 border text-gray-700">
              <select
                value={timeRange}
                onChange={handleSelectionChange}
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
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 border">Total Orders</td>
            <td className="px-4 py-2 border">{selectedData.totalOrders}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Average Orders Per User</td>
            <td className="px-4 py-2 border">{selectedData.averageOrdersPerUser}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Average Delivery Time</td>
            <td className="px-4 py-2 border">{selectedData.averageDeliveryTime}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Delivery Complete Rate</td>
            <td className="px-4 py-2 border">{selectedData.deliveryCompleteRate}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border">Canceled Orders</td>
            <td className="px-4 py-2 border">{selectedData.canceledOrders}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderStatistics;
