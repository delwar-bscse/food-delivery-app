import React from 'react';
import { Flex, Progress } from 'antd';
const RatingStatics = () => (
  <div className='w-full'>
    <div className='flex items-center gap-2'>
      <span>5</span>
      <Progress percent={30}  size={["100%", 20]} />
    </div>
  </div>
);
export default RatingStatics;