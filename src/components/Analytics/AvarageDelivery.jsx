import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAverageDeliveryTimeQuery } from '../../redux/apiSlices/analyticsSlice';


// Time Converter
function convertMinutesToDHM(minutes) {
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  const remainingMinutes = minutes % 60;

  return `${days} days ${hours} hours ${remainingMinutes} minutes`;
}
//Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/40 rounded-md p-4">
        <p>Average Delivery Time</p>
        <p className="">Type : {label}</p>
        <p className="">Time : {convertMinutesToDHM(payload[0].value)}</p>
      </div>
    );
  }

  return null;
};

const AvarageDelivery = () => {
  const { data: datas } = useAverageDeliveryTimeQuery();
  // console.log("Average Delivery", datas?.data?.averageDeliveryTimes);
  const filterDatas = datas?.data?.averageDeliveryTimes
  // console.log("Average Delivery", filterDatas);

  return (
    <div className='border border-gray-200'>
      <div className='text-2xl font-semibold p-4'>Average Delivery Time</div>
      <div className='h-[262px]'>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={300}
            height={300}
            data={filterDatas}
            margin={{
              top: 10,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="0 3" />
            <XAxis dataKey="deliveryType" tickMargin={10} tickSize={10} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="totalDeliveryTime" fill="#9b59b6" barSize={30} activeBar={<Rectangle fill="#2ecc71 " stroke="#2ecc71" />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AvarageDelivery;
