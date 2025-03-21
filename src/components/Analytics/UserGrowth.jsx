import { useEffect, useState } from "react";
import { DatePicker, Select } from "antd"; // Assuming Select is from Ant Design
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import { useTotalUsersQuery } from "../../redux/apiSlices/userSlice";

const monthConverter = (no) => {
  switch (no) {
    case 1:
      return "Jan";
    case 2:
      return "Feb";
    case 3:
      return "Mar";
    case 4:
      return "Apr";
    case 5:
      return "May";
    case 6:
      return "Jun";
    case 7:
      return "Jul";
    case 8:
      return "Aug";
    case 9:
      return "Sep";
    case 10:
      return "Oct";
    case 11:
      return "Nov";
    case 12:
      return "Dec";
    default:
      return "Jan";
  }
}

// Dummy data for Chart - Year
const dataYear = [
  { chart_x: "Jan", chart_y: 30 },
  { chart_x: "Feb", chart_y: 70 },
  { chart_x: "Mar", chart_y: 20 },
  { chart_x: "Apr", chart_y: 40 },
  { chart_x: "May", chart_y: 15 },
  { chart_x: "Jun", chart_y: 70 },
  { chart_x: "Jul", chart_y: 60 },
  { chart_x: "Aug", chart_y: 90 },
  { chart_x: "Sep", chart_y: 80 },
  { chart_x: "Oct", chart_y: 50 },
  { chart_x: "Nov", chart_y: 90 },
  { chart_x: "Dec", chart_y: 70 },
];
// Dummy data for Chart - Month
const dataMonth = [
  { chart_x: 1, chart_y: 30 },
  { chart_x: 2, chart_y: 70 },
  { chart_x: 3, chart_y: 20 },
  { chart_x: 4, chart_y: 40 },
  { chart_x: 5, chart_y: 15 },
  { chart_x: 6, chart_y: 70 },
  { chart_x: 7, chart_y: 60 },
  { chart_x: 8, chart_y: 90 },
  { chart_x: 9, chart_y: 80 },
  { chart_x: 10, chart_y: 50 },
  { chart_x: 11, chart_y: 90 },
  { chart_x: 12, chart_y: 70 },
  { chart_x: 13, chart_y: 30 },
  { chart_x: 14, chart_y: 70 },
  { chart_x: 15, chart_y: 20 },
  { chart_x: 16, chart_y: 40 },
  { chart_x: 17, chart_y: 15 },
  { chart_x: 18, chart_y: 70 },
  { chart_x: 19, chart_y: 60 },
  { chart_x: 20, chart_y: 90 },
  { chart_x: 21, chart_y: 80 },
  { chart_x: 22, chart_y: 50 },
  { chart_x: 23, chart_y: 90 },
  { chart_x: 24, chart_y: 70 },
  { chart_x: 25, chart_y: 30 },
  { chart_x: 26, chart_y: 70 },
  { chart_x: 27, chart_y: 20 },
  { chart_x: 28, chart_y: 40 },
  { chart_x: 29, chart_y: 15 },
  { chart_x: 30, chart_y: 70 },
];


const options = [
  {
    value: 'month',
    label: 'Month',
  },
  {
    value: 'year',
    label: 'Year',
  },
]


const UserGrowth = () => {
  const [data, setData] = useState(dataMonth);
  const [duration, setDuration] = useState("year");
  const [selectedDate, setSelectedDate] = useState(
    `${new Date().getFullYear()}`
  );

  // const { data: totalUsers } = useTotalUsersQuery();
  // console.log(totalUsers);

  // useEffect(() => {
  //   getChartData();
  // }, [duration]);

  // Custom Tooltip Function
  const renderCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { chart_x, chart_y } = payload[0].payload; // Access the specific data point
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
          <p><strong>${chart_y}k</strong></p>
          {duration === "month" ? (
            <p><strong> {selectedDate} - {chart_x}</strong></p>
          ) : (
            <p><strong>{chart_x} - {selectedDate}</strong></p>
          )}
        </div>
      );
    }
    return null;
  };



  const onChange = (date, dateString) => {
    console.log(dateString);
    setSelectedDate(dateString);
    setData(duration === "month" ? dataMonth : dataYear);
  };

  const handleChange = (value) => {
    console.log(value);
    setDuration(value);
  };

  return (
    <div className="w-full border border-gray-200 p-3">
      <div className="flex items-center justify-between px-8 py-3">
        <h4 className="text-2xl font-semibold text-gray-800">New User Growth</h4>
        <div className="flex items-center justify-end gap-1">
          <div>
            <Select
              placeholder="Year"
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={options}
            />
          </div>
          <div className="">
            {duration === "month" ?
              <DatePicker onChange={onChange} picker="month" allowClear={false} /> :
              <DatePicker onChange={onChange} picker="year" allowClear={false} />}
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={363}>
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
          <XAxis dataKey="chart_x" tick={{ fontSize: 14 }} tickLine={false} axisLine={false} tickMargin={10} />
          <YAxis tickLine={false} axisLine={false} tickMargin={20} />
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
            dataKey="chart_y"
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

export default UserGrowth;
