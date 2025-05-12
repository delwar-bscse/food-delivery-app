import React, { useEffect, useState } from 'react'
import { Table, Tag, Pagination } from 'antd';
import { FaCircle } from "react-icons/fa";
import { LuView } from "react-icons/lu";
import { ordersManagementData } from '../../datas/ordersManagementData';
import { useOrdersQuery } from '../../redux/apiSlices/orderSlice';
import { BiShekel } from "react-icons/bi";
import { Link } from 'react-router-dom';

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
        title: 'CUSTOMER NAME',
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
        render: (price) => <p className='flex items-center gap-1'><BiShekel size={16}/>{price}</p>,
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

const OrderManagement = () => {
    const [activeTab, setActiveTab] = useState('');
    const [selectRow, setSelectRow] = useState('orderid');
    const [searchValue, setSearchValue] = useState("");
    const [current, setCurrent] = useState(1);
    const [limit, setLimit] = useState(10);


    const { data: orderData, isLoading, refetch } = useOrdersQuery({
        status: activeTab,
        page: current,
        limit: limit
    });
    // console.log(orderData);

    const filteredData = orderData?.data
        ?.map((item, index) => {
            return {
                ...item,
                key: item?._id,
                orderid: item?._id,
                index
            }
        })
        .filter((item) => item[selectRow].toLowerCase().includes(searchValue.toLowerCase()));

    useEffect(() => {
        refetch();
    }, [activeTab, current]);

    isLoading && <p>Loading...</p>


    return (
        <div className='space-y-6'>

            {/* Filter by status */}
            <div className='grid grid-cols-5 gap-4 bg-gray-200 rounded-full p-1'>
                <button onClick={() => setActiveTab('')} className={`${activeTab === '' && 'bg-white'} p-3 rounded-full`}>
                    All
                </button>
                <button onClick={() => setActiveTab('PENDING')} className={`${activeTab === 'PENDING' && 'bg-white'} p-3 rounded-full`}>
                    Pending
                </button>
                <button onClick={() => setActiveTab('REQUESTED')} className={`${activeTab === 'REQUESTED' && 'bg-white'} p-3 rounded-full`}>
                    Requested
                </button>
                <button onClick={() => setActiveTab('IN_TRANSIT')} className={`${activeTab === 'IN_TRANSIT' && 'bg-white'} p-3 rounded-full`}>
                    In-Transit
                </button>
                <button onClick={() => setActiveTab('DELIVERED')} className={`${activeTab === 'DELIVERED' && 'bg-white'} p-3 rounded-full`}>
                    Delivered
                </button>
            </div>
            <div className="w-full border-2 rounded-lg overflow-hidden">
                <Table columns={columns} dataSource={filteredData} pagination={false} />
            </div>
            {/* {console.log("orderData: ", orderData?.data)} */}
            <div className="flex justify-center">
                <Pagination current={orderData?.pagination?.currentPage} onChange={(page, pageSize) => {setCurrent(page); setLimit(pageSize)}} total={orderData?.pagination?.totalParcels} />
            </div>
        </div>
    )
}

export default OrderManagement