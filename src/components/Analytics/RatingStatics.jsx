import React from 'react';
import { Flex, Progress } from 'antd';
import { t } from 'i18next';

const generatePercent = (total, value) => {
  return Math.round((value / total) * 100);
}

const starsData = {
  star_total: 10000,
  stars_5: 7400,
  stars_4: 1990,
  stars_3: 900,
  stars_2: 1190,
  stars_1: 1100
}

const RatingStatics = () => (
  <div className='border border-gray-200 p-3'>
    <h2 className='font-semibold text-2xl py-4 text-center'>Customer & Courier Ratings</h2>
    <div className='w-full space-y-4'>
      <div className='flex flex-col gap-2'>
        <div>5 Stars  - {starsData.stars_5} users</div>
        <Progress percent={generatePercent(starsData.star_total, starsData.stars_5)} size={["100%", 20]} strokeColor={"#FFC107"} />
      </div>
      <div className='flex flex-col gap-2'>
        <div>4 Stars - {starsData.stars_4} users</div>
        <Progress percent={generatePercent(starsData.star_total, starsData.stars_4)} size={["100%", 20]} strokeColor={"#FFC107"} />
      </div>
      <div className='flex flex-col gap-2'>
        <div>3 Stars - {starsData.stars_3} users</div>
        <Progress percent={generatePercent(starsData.star_total, starsData.stars_3)} size={["100%", 20]} strokeColor={"#FFC107"} />
      </div>
      <div className='flex flex-col gap-2'>
        <div>2 Stars - {starsData.stars_2} users</div>
        <Progress percent={generatePercent(starsData.star_total, starsData.stars_2)} size={["100%", 20]} strokeColor={"#FFC107"} />
      </div>
      <div className='flex flex-col gap-2'>
        <div>1 Stars - {starsData.stars_1} users</div>
        <Progress percent={generatePercent(starsData.star_total, starsData.stars_1)} size={["100%", 20]} strokeColor={"#FFC107"} />
      </div>
    </div>
  </div>
);
export default RatingStatics;