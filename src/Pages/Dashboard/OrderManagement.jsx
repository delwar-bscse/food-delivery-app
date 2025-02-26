import React, { useState } from 'react'
import { Table, Tag, Select, Input, Button, Space } from 'antd';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { LuView } from "react-icons/lu";
import { ordersManagementData } from '../../datas/ordersManagementData';

const { Search } = Input;
const options = [
    {
        value: 'orderid',
        label: 'Order ID',
    },
    {
        value: 'customername',
        label: 'Customer Name',
    },
];

const orderStatusColors = {
    'In-Transit': 'blue',
    Delivered: 'green',
    Canceled: 'red',
};

const columns = [
    {
        title: 'ORDER ID.',
        dataIndex: 'orderid',
        key: 'orderid'
    },
    {
        title: 'CUSTOMER NAME',
        dataIndex: 'customername',
        key: 'customername',
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
        title: 'SHIPPING TYPE',
        dataIndex: 'shippingtype',
        key: 'shippingtype',
        render: (shippintype) => <p>${shippintype}</p>,
    },
    {
        title: 'DATE',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'BILL',
        dataIndex: 'bill',
        key: 'bill',
        render: (bill) => <p>${bill}</p>,
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <div className='flex justify-start items-center gap-3'>
                <button className='text-white bg-gray-500 p-1 rounded-sm'><LuView size={20} /></button>
                <button className='text-white bg-green-500 p-1 rounded-sm'><FiEdit size={20} /></button>
                <button className='text-white bg-red-500 p-1 rounded-sm'><RiDeleteBin5Line size={20} /></button>
            </div>
        ),
    },
];

const OrderManagement = () => {
    const [activeTab, setActiveTab] = useState('In-Transit')
    return (
        <div className='space-y-6'>
            <div className='grid grid-cols-3 gap-4 bg-gray-200 rounded-full p-1'>
                <button onClick={() => setActiveTab('In-Transit')} className={`${activeTab === 'In-Transit' && 'bg-white'} p-3 rounded-full`}>
                    In-Transit
                </button>
                <button onClick={() => setActiveTab('Delivered')} className={`${activeTab === 'Delivered' && 'bg-white'} p-3 rounded-full`}>
                    Delivered
                </button>
                <button onClick={() => setActiveTab('Cancelled')} className={`${activeTab === 'Cancelled' && 'bg-white'} p-3 rounded-full`}>
                    Cancelled
                </button>
            </div>
            <>
                <div className='flex items-center gap-4 pt-4'>
                    <div className='flex justify-between items-center max-w-[800px]'>
                        <Space.Compact style={{ height: '50px', minWidth: '500px' }}>
                            <Select defaultValue="orderid" options={options} style={{ height: '50px', minWidth: '170px' }} />
                            <Input placeholder='Search...' />
                        </Space.Compact>
                    </div>
                    <div>
                        <Select
                            placeholder="Status"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            size='large'
                            style={{ width: '200px', height: '50px' }}
                            options={[
                                {
                                    value: '1',
                                    label: 'In-Transit',
                                },
                                {
                                    value: '2',
                                    label: 'Delivered',
                                },
                                {
                                    value: '3',
                                    label: 'Cancelled',
                                },
                            ]}
                        />
                    </div>
                </div>
            </>
            <div className="w-full border-2 rounded-lg overflow-hidden">
                <Table columns={columns} dataSource={ordersManagementData} pagination={{ pageSize: 10 }} />
            </div>
        </div>
    )
}

export default OrderManagement