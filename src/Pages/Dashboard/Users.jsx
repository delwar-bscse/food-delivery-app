import React, { useEffect, useState } from "react";
import { Table, Button, Space, Avatar, Select, Input } from "antd";
import { Modal } from 'antd';
import { LuView } from "react-icons/lu";
import randomImg from "../../assets/randomProfile2.jpg";
import { useUpdateStatusMutation, useUsersQuery } from "../../redux/apiSlices/userSlice";

import { Pagination } from 'antd';
import { useFreeDeliveryAssignMutation } from "../../redux/apiSlices/freeDeliverySlice";

const Users = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [freeDelivery, setFreeDelivery] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [singleUser, setSingleUser] = useState("");
  const [current, setCurrent] = useState(1);
  const [filterType, setFilterType] = useState("");

  const [updateStatus] = useUpdateStatusMutation();
  const { data: usersData, isLoading, refetch } = useUsersQuery({
    page: current,
    filterType: filterType
  });
  const [freeDeliveryAssign] = useFreeDeliveryAssignMutation();

  // console.log("Backend Data", usersData?.data?.users);
  const dataSource = usersData?.data?.users?.map((user, index) => ({
    ...user,
    key: user._id,
    id: index + 1,
  }));

  const showModal = (record) => {
    setSingleUser(record);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleUpdateStatus = async (record) => {
    await updateStatus({
      userId: record._id,
      isRestricted: record.isRestricted ? false : true
    }).unwrap();
    refetch();
  }


  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (fullName, record) => {
        const name = record?.fullName || "Unknown";
        const imgUrl = record?.profileImg;
        const fullImgUrl = (imgUrl?.startsWith("http")
          ? imgUrl
          : `${import.meta.env.VITE_BASE_URL}${imgUrl}`);

        return (
          <Space>
            <Avatar src={randomImg} alt={name} size="large" />
            <span>{name}</span>
          </Space>
        );
      },
    },
    {
      title: "Email & Number",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      render: (_, record) => `${record?.email ? record?.email : record?.mobileNumber}`,
    },
    {
      title: "Joined",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => new Date(createdAt).toISOString().split('T')[0]
    },
    {
      title: "Earned",
      dataIndex: "totalEarning",
      key: "totalEarning",
    },
    {
      title: "Status",
      dataIndex: "isRestricted",
      key: "isRestricted",
      render: (isRestricted, record) => {
        let color = isRestricted ? "red" : "green"
        return <button onClick={() => handleUpdateStatus(record)} style={{ color }}>{isRestricted ? "Restricted" : "Active"}</button>;
      },
    },
    {
      title: "Actions",
      key: "_id",
      render: (_, record) => (
        <div className='flex justify-start items-center gap-3'>
          <button onClick={() => showModal(record)} className='text-white bg-yellow-500 p-1 rounded-sm'><LuView size={20} /></button>
          {/* <button className=' p-1 rounded-sm'>{record?.isRestricted ? "Restricted" : "Active"}</button> */}

        </div>
      ),
    },
  ];

  // const handleChange = (value) => {
  //   console.log(`selected ${value}`);
  // };

  useEffect(() => {
    console.log(filterType, current);
    refetch({
      page: current,
      filterType: filterType
    });
  }, [filterType, current]);

  const onSelectChange = (newSelectedRowKeys) => {
    // console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleFreeDelivery = () => {
    console.log({
      userIds: selectedRowKeys,
      freeDeliveries: freeDelivery
    });
    freeDeliveryAssign({
      userIds: selectedRowKeys,
      freeDeliveries: freeDelivery
    });
  }

  return (
    isLoading ? <p>Loading....</p> : <>
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold  my-5">Users</h1>
        <div className="flex gap-3 justify-end">
          {/* Assign Free Delivery */}
          <div className="flex border border-gray-300 bg-white rounded-md overflow-hidden">
            <input
              className="max-w-[80px] px-2 border-none outline-none bg-transparent text-center"
              type="number"
              onChange={(e) => setFreeDelivery(e.target.value)}
            />
            <button onClick={handleFreeDelivery} className="border-l bg-transparent border-gray-300 text-gray-600 px-3 py-1">
              Assign Free Delivery
            </button>
          </div>
          {/* Filter by email or number */}
          <div className="w-[200px]">
            <Select
              size="large"
              placeholder="Filter By"
              style={{
                width: "100%",
              }}
              onChange={(e) => {
                setFilterType(e);
                setCurrent(1);
              }}
              options={[
                {
                  value: '',
                  label: 'All',
                },
                {
                  value: 'email',
                  label: 'Email',
                },
                {
                  value: 'mobile',
                  label: 'Number',
                }
              ]}
            />
          </div>
        </div>
      </div>
      {/* User Details Modal */}
      <Modal footer={null} open={isModalOpen} onCancel={handleCancel} width={800} centered>
        <div className='space-y-8 p-6 pt-16'>
          <div>
            <h2 className='text-2xl font-semibold text-center'>User Details</h2>
            <p>{singleUser?.fullName}</p>
          </div>
          <div className='flex justify-end'>
            <button onClick={handleOk} className='bg-gray-800 text-white py-2 px-5 rounded-md'>
              Close
            </button>
          </div>
        </div>
      </Modal>
      {/* Users Table */}
      <Table
        columns={columns}
        dataSource={dataSource}
        rowSelection={rowSelection}
        // pagination={{ pageSize, onChange: () => setPageSize() }}
        scroll={{ x: 1000 }}
        pagination={false}
      />
      <div className="flex justify-center py-6">
        <Pagination current={usersData?.data?.currentPage} onChange={(e) => setCurrent(e)} total={usersData?.data?.totalUsers} />
      </div>
    </>
  );
};

export default Users;
