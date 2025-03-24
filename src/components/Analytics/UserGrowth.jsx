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
import { useGeneralStatesQuery } from "../../redux/apiSlices/dashboardSlice";
// import moment from "moment/moment";
// import { set } from "jodit/types/core/helpers";


// Function to convert month number to month name
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
  { x: "Jan", y: 30 },
  { x: "Feb", y: 70 },
  { x: "Mar", y: 20 },
  { x: "Apr", y: 40 },
  { x: "May", y: 15 },
  { x: "Jun", y: 70 },
  { x: "Jul", y: 60 },
  { x: "Aug", y: 90 },
  { x: "Sep", y: 80 },
  { x: "Oct", y: 50 },
  { x: "Nov", y: 90 },
  { x: "Dec", y: 70 },
];
// Dummy data for Chart - Month
const dataMonth = [
  { x: 1, y: 30 },
  { x: 2, y: 70 },
  { x: 3, y: 20 },
  { x: 4, y: 40 },
  { x: 5, y: 15 },
  { x: 6, y: 70 },
  { x: 7, y: 60 },
  { x: 8, y: 90 },
  { x: 9, y: 80 },
  { x: 10, y: 50 },
  { x: 11, y: 90 },
  { x: 12, y: 70 },
  { x: 13, y: 30 },
  { x: 14, y: 70 },
  { x: 15, y: 20 },
  { x: 16, y: 40 },
  { x: 17, y: 15 },
  { x: 18, y: 70 },
  { x: 19, y: 60 },
  { x: 20, y: 90 },
  { x: 21, y: 80 },
  { x: 22, y: 50 },
  { x: 23, y: 90 },
  { x: 24, y: 70 },
  { x: 25, y: 30 },
  { x: 26, y: 70 },
  { x: 27, y: 20 },
  { x: 28, y: 40 },
  { x: 29, y: 15 },
  { x: 30, y: 70 },
];
// Dropdown Options for Duration
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

//---------------------------------------- Total Revenue Component ----------------------------------------//
const UserGrowth = () => {
  const [durationType, setDurationType] = useState("year");
  const [isYear, setIsYear] = useState(new Date().getFullYear());
  const [isMonth, setIsMonth] = useState(null);

  // Get general states data.
  const { data: data, isLoading, refetch } = useGeneralStatesQuery({
    defaultPath: "newUsers",
    year: isYear,
    month: isMonth
  });

  // console.log("General State :", data?.data);


  useEffect(() => {
    refetch();
  }, [isMonth, isYear]);


  const handleDateChange = (date, dateString) => {
    if (durationType === 'month') {
      const year = dateString.split("-")[0];
      const month = dateString.split("-")[1] || null;
      setIsYear(year);
      setIsMonth(month);
    } else {
      const year = dateString;
      const month = null;
      setIsYear(year);
      setIsMonth(month);
    }
  };

  const handleDurationTypeChange = (value) => {
    // console.log(value);
    setDurationType(value);
    if(value === "month") {
      setIsYear(new Date().getFullYear());
      setIsMonth(new Date().getMonth() + 1);
    }else{
      setIsYear(new Date().getFullYear());
      setIsMonth(null);
    }
  };

  isLoading ? <div className="flex justify-center items-center my-20 text-lg text-secondary">Loading...</div> : null

  // Custom Tooltip Function
  const renderCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { x, y } = payload[0].payload; // Access the specific data point
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
          <p><strong>New Users: {y}</strong></p>
          {durationType === "month" ? (
            <p><strong>{x} - {monthConverter(isMonth)} - {isYear}</strong></p>
          ) : (
            <p><strong>{monthConverter(x)}  - {isYear}</strong></p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full border-2 border-gray-200 p-3 rounded-xl">
      <div className="flex items-center justify-between px-8 pb-3">
        <h4 className="text-2xl font-semibold text-gray-800">New Users Growth</h4>
        <div className="flex items-center justify-end gap-1">
          <div>
            <Select
              placeholder="Year"
              style={{
                width: 120,
              }}
              onChange={handleDurationTypeChange}
              options={options}
            />
          </div>
          <div className="">
            {durationType === "month" ?
              <DatePicker onChange={handleDateChange} picker="month" allowClear={true} /> :
              <DatePicker onChange={handleDateChange} picker="year" allowClear={true}/>}
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={353}>
        <AreaChart
          data={data?.data}
          syncId="anyId"
          margin={{
            top: 20,
            right: 30,
            left: 30,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="0 4" />
          <XAxis dataKey="x" tick={{ fontSize: 14 }} tickLine={false} axisLine={false} tickMargin={10} />
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
            dataKey="y"
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
