import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Bike',
    time: 1055
  },
  {
    name: 'Car',
    time: 1543
  },
  {
    name: 'Bicycle',
    time: 3534
  },
  {
    name: 'Plane',
    time: 9722
  },
  {
    name: 'Person',
    time: 1723
  },
  {
    name: 'Truck',
    time: 4556
  },
  {
    name: 'Taxi',
    time: 5777
  },
];

//Time Converter
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
  return (
    <div className='border border-gray-200'>
      <div className='text-2xl font-semibold p-4'>Average Delivery Time</div>
      <div className='h-[344px]'>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={300}
            height={300}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="0 3" />
            <XAxis dataKey="name" tickMargin={10} tickSize={10} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="time" fill="#9b59b6" barSize={50} activeBar={<Rectangle fill="#2ecc71 " stroke="#2ecc71" />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AvarageDelivery;
