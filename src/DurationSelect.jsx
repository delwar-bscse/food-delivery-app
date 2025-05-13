import { useEffect, useState } from 'react';
import { DatePicker, Select, Space } from 'antd';
const { Option } = Select;




const DurationSelect = ({duration, setDuration}) => {
  const [type, setType] = useState('year');


  const handleDateChange = (date, dateString) => {
    const dateArray = dateString.split('-');
    setDuration({
      year: dateArray[0],
      month: dateArray[1] || null,
      day: dateArray[2] || null,
    });
  }

  // useEffect(() =>{
  //   console.log(duration);
  // },[duration])

  return (
    <Space className=''>
      <Select aria-label="Picker Type" value={type} onChange={(value)=>setType(value)}>
        <Option value="year">Year</Option>
        <Option value="month">Month</Option>
        <Option value="">Day</Option>
      </Select>
       <DatePicker picker={type} onChange={handleDateChange}/>
    </Space>
  );
};
export default DurationSelect;