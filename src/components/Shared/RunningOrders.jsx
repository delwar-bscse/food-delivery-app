import React from 'react';
import { Space, Table, Tag } from 'antd';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { LuView } from "react-icons/lu";
import { runningOrderDatas } from '../../../datas/runningOrders';


const orderStatusColors = {
  Processing: 'blue',
  Completed: 'green',
  Delivered: 'purple',
  Cancelled: 'red',
};

const columns = [
  {
    title: 'Order No.',
    dataIndex: 'orderno',
    key: 'orderno',
    render: (orderno) => <p>#{orderno}</p>,
  },
  {
    title: 'Budget',
    dataIndex: 'budget',
    key: 'budget',
    render: (budget) => <p>${budget}</p>,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Customer Name',
    dataIndex: 'customername',
    key: 'customername',
  },
  {
    title: 'Delivery Person',
    dataIndex: 'deliveryperson',
    key: 'deliveryperson',
  },
  {
    title: 'Product ID',
    dataIndex: 'productid',
    key: 'productid',
  },
  {
    title: 'Order Status',
    dataIndex: 'orderstatus',
    key: 'orderstatus',
    render: (status) => (
      <Tag color={orderStatusColors[status]}>{status}</Tag>
    ),
  },
  // {
  //   title: 'Action',
  //   key: 'action',
  //   render: (_, record) => (
  //     <div className='flex justify-start items-center gap-3'>
  //       <button className='text-white bg-gray-500 p-1 rounded-sm'><LuView size={20}/></button>
  //       <button className='text-white bg-green-500 p-1 rounded-sm'><FiEdit size={20}/></button>
  //       <button className='text-white bg-red-500 p-1 rounded-sm'><RiDeleteBin5Line size={20}/></button>
  //     </div>
  //   ),
  // },
];


const RunningOrders = () => {
  return (
    <div className="w-full border-2 rounded-xl overflow-hidden">
    <h2 className='font-semibold text-2xl p-4'>Running Orders</h2>
      <Table columns={columns} dataSource={runningOrderDatas} pagination={{ pageSize: 10 }} />
    </div>
  );
};

export default RunningOrders;
