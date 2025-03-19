import { useState } from "react";
import { Select } from "antd"; // Assuming Select is from Ant Design
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", earns: 30 },
  { month: "Feb", earns: 70 },
  { month: "Mar", earns: 20 },
  { month: "Apr", earns: 40 },
  { month: "May", earns: 15 },
  { month: "Jun", earns: 70 },
  { month: "Jul", earns: 50 },
  { month: "Aug", earns: 60 },
  { month: "Sep", earns: 90 },
  { month: "Oct", earns: 80 },
  { month: "Nov", earns: 90 },
  { month: "Dec", earns: 70 },
];


const TotalRevenue = () => {
  const [duration, setDuration] = useState("all");

  // Custom Tooltip Function
  const renderCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { month, earns } = payload[0].payload; // Access the specific data point
      return (
        <div
          style={{
            backgroundColor: "white",
            color: "rgba(0, 0, 0, 0.7)",
            padding: "10px",
            borderRadius: "5px",
            fontSize: "14px",
            maxWidth: "200px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Optional: Adds a subtle shadow
          }}
        >
          <p><strong>${earns}k</strong> Earning</p>
          <p><strong>{month}, 2024</strong></p>
        </div>
      );
    }
    return null;
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
    <div className="w-full border border-gray-200 p-3">
      <div className="flex items-center justify-between px-8">
        <h4 className="text-2xl font-semibold text-gray-800 py-4">Total Revenue</h4>
        <div className="flex justify-end py-2">
          <Select
            value={duration}
            style={{ width: 120 }}
            onChange={handleChange}
            options={options}
            size="large"
          />
        </div>
      </div>
      <ResponsiveContainer width="100%" height={353}>
        <AreaChart
          data={data}
          syncId="anyId"
          margin={{
            top: 20,
            right: 30,
            left: 30,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="0 4" />
          <XAxis dataKey="month" tick={{ fontSize: 14 }} tickLine={false} axisLine={false} tickMargin={10} />
          <YAxis tickLine={false} axisLine={false} tickMargin={20}/>
          <Tooltip content={renderCustomTooltip} />

          {/* Gradient fill definition */}
          <defs>
            <linearGradient id="gradientColor" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="1%" stopColor="#EBF4FF" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#EBF4FF" stopOpacity={0.2} />
            </linearGradient>
          </defs>

          {/* Area with gradient fill */}
          <Area
            type="monotone"
            dataKey="earns"
            stroke="#2D9CDB"
            strokeWidth={2}
            fill="url(#gradientColor)" // Apply gradient by referencing its ID
            activeDot={{
              fill: "#2D9CDB", // Dot fill color
              stroke: "white", // Dot borders color
              strokeWidth: 6, // Dot borders width
              r: 10, // Dot size (radius)
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalRevenue;
