import { useEffect } from 'react';
import { Progress } from 'antd';
import { useRatingsQuery } from '../../redux/apiSlices/analyticsSlice';

const generatePercent = (total, value) => {
  return Math.round((value / total) * 100);
}



const RatingStatics = () => {
  const { data: totalRatings, isLoading } = useRatingsQuery();
  isLoading && <div>Loading...</div>
  console.log(totalRatings?.data);
  const starsData = totalRatings?.data;
  let totalStar = 0;

  useEffect(()=>{
    for(let x in starsData){
      totalStar += starsData[x];
    }
  },[starsData]);

  return(
    <div className='border border-gray-200 p-3'>
      <h2 className='font-semibold text-2xl py-4 text-center'>Customer & Courier Ratings</h2>
      <div className='w-full space-y-4'>
        <div className='flex flex-col gap-2'>
          <div>5 Stars  - {starsData?.star_5} users</div>
          <Progress percent={generatePercent(totalStar, starsData?.star_5)} size={["100%", 20]} strokeColor={"#FFC107"} />
        </div>
        <div className='flex flex-col gap-2'>
          <div>4 Stars - {starsData?.star_4} users</div>
          <Progress percent={generatePercent(totalStar, starsData?.star_4)} size={["100%", 20]} strokeColor={"#FFC107"} />
        </div>
        <div className='flex flex-col gap-2'>
          <div>3 Stars - {starsData?.star_3} users</div>
          <Progress percent={generatePercent(totalStar, starsData?.star_3)} size={["100%", 20]} strokeColor={"#FFC107"} />
        </div>
        <div className='flex flex-col gap-2'>
          <div>2 Stars - {starsData?.star_2} users</div>
          <Progress percent={generatePercent(totalStar, starsData?.star_2)} size={["100%", 20]} strokeColor={"#FFC107"} />
        </div>
        <div className='flex flex-col gap-2'>
          <div>1 Stars - {starsData?.star_1} users</div>
          <Progress percent={generatePercent(totalStar, starsData?.star_1)} size={["100%", 20]} strokeColor={"#FFC107"} />
        </div>
      </div>
    </div>
  );
}

export default RatingStatics;