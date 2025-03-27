import React, { useEffect, useState } from 'react'
import { Table, Tag, Select, Input, Button, Space, Pagination } from 'antd';
import { FaCircle } from "react-icons/fa";
import { LuView } from "react-icons/lu";
import { BiShekel } from "react-icons/bi";
import { ordersManagementData } from '../../datas/ordersManagementData';
import { useOrdersQuery } from '../../redux/apiSlices/orderSlice';
import { Link, useParams } from 'react-router-dom';
import { useUserByIdQuery } from '../../redux/apiSlices/userSlice';

const options = [
    {
        value: 'orderid',
        label: 'Order ID',
    },
    // {
    //     value: 'customername',
    //     label: 'Customer Name',
    // },
    // {
    //     value: 'deliveryperson',
    //     label: 'Delivery Person',
    // },
];

const orderStatusColors = {
    pending: 'red',
    requested: 'yellow',
    accepted: 'orange',
    in_transit: 'blue',
    delivered: 'green',
};
const shippingTypeColors = {
    truck: 'red',
    car: 'skyblue',
    bicycle: 'orange',
    bike: 'blue',
    person: 'green',
};
const senderTypeColors = {
    'Non-Professional': 'orange',
    Professional: 'green',
};

const columns = [
    {
        title: 'ORDER ID.',
        dataIndex: '_id',
        key: '_id'
    },
    {
        title: 'SENDER NAME',
        dataIndex: 'senderId',
        key: 'senderId',
        render: (senderId) => senderId?.fullName
    },
    {
        title: 'STATUS',
        dataIndex: 'status',
        key: 'status',
        render: (status) => (
            <Tag color={orderStatusColors[status]}>{status}</Tag>
        ),
    },
    {
        title: 'ITEM',
        dataIndex: 'item',
        key: 'item'
    },
    {
        title: 'DELIVERY PERSON',
        dataIndex: 'deliveryperson',
        key: 'deliveryperson',
    },
    {
        title: 'DELIVERY TYPE',
        dataIndex: 'deliveryType',
        key: 'deliveryType',
        render: (deliveryType) => <p className='flex items-center gap-2'>
            <span><FaCircle color={shippingTypeColors[deliveryType]} /></span>
            <span>{deliveryType}</span>
        </p>,
    },
    {
        title: 'SENDER TYPE',
        dataIndex: 'senderType',
        key: 'senderType',
        render: (senderType) => <Tag color={senderTypeColors[senderType]}>{senderType}</Tag>
    },
    {
        title: 'DATE',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'BILL',
        dataIndex: 'price',
        key: 'price',
        render: (price) => <p className='flex items-center gap-1'><BiShekel /><span>{price}</span></p>,
    },
    {
        title: 'Details',
        key: 'action',
        render: (_, record) => (
            <div className='flex items-center'>
                <Link to={`/orders/${record._id}`} className='text-white bg-yellow-500 p-1 rounded-sm'><LuView size={20} /></Link>
            </div>
        ),
    },
];

const UserOrder = () => {
    const { id } = useParams();

    const { data: singleUser, isLoading, isSuccess, refetch } = useUserByIdQuery(id);
    // console.log(singleUser);

    const parcelsData = isSuccess && singleUser?.parcels?.map((item, index) => {
        return {
            ...item,
            key:index
        }
    })


    isLoading && <p>Loading...</p>

    return (
        <div className='space-y-6'>
            <h2 className='font-semibold text-2xl pt-3'>User's Activity</h2>
            <div className="w-full border-2 rounded-lg overflow-hidden">
                <Table columns={columns} dataSource={parcelsData} pagination={false} />
            </div>
        </div>
    )
}

export default UserOrder