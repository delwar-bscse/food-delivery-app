import React, { useState } from 'react'
import { Table, Tag, Select, Input, Button, Space } from 'antd';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaCircle } from "react-icons/fa";
import { LuView } from "react-icons/lu";
import { ordersManagementData } from '../../datas/ordersManagementData';

const options = [
    {
        value: 'orderid',
        label: 'Order ID',
    },
    {
        value: 'customername',
        label: 'Customer Name',
    },
    {
        value: 'deliveryperson',
        label: 'Delivery Person',
    },
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
        dataIndex: 'bill',
        key: 'bill',
        render: (bill) => <p>${bill}</p>,
    },
    {
        title: 'Details',
        key: 'action',
        render: (_, record) => (
            <button className='text-gray-500 p-1 rounded-sm'><FiEdit size={20} /></button>
        ),
    },
];

const OrderManagement = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [tableData, setTableData] = useState(ordersManagementData);
    const [selectRow, setSelectRow] = useState('orderid');
    const [searchValue, setSearchValue] = useState("");

    const filteredData = tableData
        ?.filter((item) => item[selectRow].toLowerCase().includes(searchValue.toLowerCase()));

    console.log(selectRow);
    return (
        <div className='space-y-6'>
            <div className='grid grid-cols-6 gap-4 bg-gray-200 rounded-full p-1'>
                <button onClick={() => setActiveTab('all')} className={`${activeTab === 'all' && 'bg-white'} p-3 rounded-full`}>
                    All
                </button>
                <button onClick={() => setActiveTab('pending')} className={`${activeTab === 'pending' && 'bg-white'} p-3 rounded-full`}>
                    Pending
                </button>
                <button onClick={() => setActiveTab('requested')} className={`${activeTab === 'requested' && 'bg-white'} p-3 rounded-full`}>
                    Requested
                </button>
                <button onClick={() => setActiveTab('accepted')} className={`${activeTab === 'accepted' && 'bg-white'} p-3 rounded-full`}>
                    Accepted
                </button>
                <button onClick={() => setActiveTab('in_transit')} className={`${activeTab === 'in_transit' && 'bg-white'} p-3 rounded-full`}>
                    In-Transit
                </button>
                <button onClick={() => setActiveTab('delivered')} className={`${activeTab === 'delivered' && 'bg-white'} p-3 rounded-full`}>
                    Delivered
                </button>
            </div>
            <>
                <div className='flex items-center gap-4 pt-4'>
                    <div className='flex justify-between items-center max-w-[800px]'>
                        <Space.Compact style={{ height: '50px', minWidth: '600px' }}>
                            <Select defaultValue={selectRow} onChange={(value) => setSelectRow(value)} options={options} style={{ height: '50px', minWidth: '180px' }} />
                            <Input onChange={(e) => setSearchValue(e.target.value)} placeholder='Search...' />
                        </Space.Compact>
                    </div>
                    {/* <div>
                        <Select
                            placeholder="Status"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            value={activeTab}
                            onChange={(value) => setActiveTab(value)}
                            size='large'
                            style={{ width: '200px', height: '50px' }}
                            options={[
                                {
                                    value: 'all',
                                    label: 'All',
                                },
                                {
                                    value: 'pending',
                                    label: 'Pending',
                                },
                                {
                                    value: 'requested',
                                    label: 'Requested',
                                },
                                {
                                    value: 'accepted',
                                    label: 'Accepted',
                                },
                                {
                                    value: 'in_transit',
                                    label: 'In-Transit',
                                },
                                {
                                    value: 'delivered',
                                    label: 'Delivered',
                                }
                            ]}
                        />
                    </div> */}
                </div>
            </>
            <div className="w-full border-2 rounded-lg overflow-hidden">
                <Table columns={columns} dataSource={filteredData} pagination={{ pageSize: 10 }} />
            </div>
        </div>
    )
}

export default OrderManagement