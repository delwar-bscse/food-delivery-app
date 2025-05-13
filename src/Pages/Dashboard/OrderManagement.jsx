import React, { useEffect, useState } from 'react'
import { Table, Tag, Pagination } from 'antd';
import { FaCircle } from "react-icons/fa";
import { LuView } from "react-icons/lu";
import { ordersManagementData } from '../../datas/ordersManagementData';
import { useOrdersQuery } from '../../redux/apiSlices/orderSlice';
import { BiShekel } from "react-icons/bi";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

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
    const [selectRow, setSelectRow] = useState('orderid');
    const [searchValue, setSearchValue] = useState("");
    const navigation = useNavigate();
    const [searchParams] = useSearchParams();
    console.log(searchParams);

    // const searchData = new URLSearchParams(params[0]);

    const page = +searchParams.get('page') || 1;
    const limit = +searchParams.get('limit') || 10;
    const activeTab = searchParams.get('activeTab') || '';

    // console.log(searchData.get('page'));
    // console.log(searchData.get('limit'));
    // console.log(searchData.get('activeTab'));
    


    const { data: orderData, isLoading, refetch } = useOrdersQuery({
        status: activeTab,
        page: page,
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
    }, [activeTab, page, limit]);

    const handlePagination = (page, pageSize) => {
        navigation(`?page=${page}&limit=${pageSize}&activeTab=${activeTab}`);
    };

    const handleActiveTab = (tab) => {
        navigation(`?page=${page}&limit=${limit}&activeTab=${tab}`);
    };

    isLoading && <p>Loading...</p>


    return (
        <div className='space-y-6'>

            {/* Filter by status */}
            <div className='grid grid-cols-5 gap-4 bg-gray-200 rounded-full p-1'>
                <button onClick={() => handleActiveTab('')} className={`${activeTab === '' && 'bg-white'} p-3 rounded-full`}>
                    All
                </button>
                <button onClick={() => handleActiveTab('PENDING')} className={`${activeTab === 'PENDING' && 'bg-white'} p-3 rounded-full`}>
                    Pending
                </button>
                <button onClick={() => handleActiveTab('REQUESTED')} className={`${activeTab === 'REQUESTED' && 'bg-white'} p-3 rounded-full`}>
                    Requested
                </button>
                <button onClick={() => handleActiveTab('IN_TRANSIT')} className={`${activeTab === 'IN_TRANSIT' && 'bg-white'} p-3 rounded-full`}>
                    In-Transit
                </button>
                <button onClick={() => handleActiveTab('DELIVERED')} className={`${activeTab === 'DELIVERED' && 'bg-white'} p-3 rounded-full`}>
                    Delivered
                </button>
            </div>
            <div className="w-full border-2 rounded-lg overflow-hidden">
                <Table columns={columns} dataSource={filteredData} pagination={false} />
            </div>
            {/* {console.log("orderData: ", orderData?.data)} */}
            <div className="flex justify-center">
                <Pagination current={page} onChange={handlePagination} pageSize={limit} total={orderData?.pagination?.totalParcels} showSizeChanger={true}/>
            </div>
        </div>
    )
}

export default OrderManagement