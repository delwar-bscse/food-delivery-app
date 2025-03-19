import React, { useState } from "react";

const UserStatistics = () => {
  // State for selected time range
  const [timeRange, setTimeRange] = useState("All");

  // Data for different time ranges
  const userState = {
    registeredUsers: 2000,
    activeUsers: 1959,
    newUsers: 50
  };


  // Function to handle the selection change
  const handleSelectionChange = (e) => {
    setTimeRange(e.target.value);
  };

  // Current data based on selection
  // const selectedData = data[timeRange];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="">
            <th className="px-4 py-2 border text-gray-700">Users Analytics</th>
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
          <tr className="">
            <th className="px-4 py-2 border text-gray-700">Users Analytics</th>
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

export default UserStatistics;
