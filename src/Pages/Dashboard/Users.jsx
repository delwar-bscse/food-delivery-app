import React, { useState } from "react";
import { Table, Button, Space, Avatar } from "antd";
import { Modal } from 'antd';
import { LuView } from "react-icons/lu";
import randomImg from "../../assets/randomProfile2.jpg";
import { useUpdateStatusMutation, useUsersQuery } from "../../redux/apiSlices/userSlice";

import { Pagination } from 'antd';

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [singleUser, setSingleUser] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [current, setCurrent] = useState(1);

  const [updateStatus] = useUpdateStatusMutation();
  const { data: usersData, isLoading, refetch } = useUsersQuery({
    page: current
  });


  const onChange = (page) => {
    console.log(page);
    setCurrent(page);
    refetch({
      page: page
    });
  };

  // console.log("Backend Data", usersData?.data?.users);
  const dataSource = usersData?.data?.users?.map((user, index) => ({
    ...user,
    key: user.id || index.toString(),  // Use `id` if available, otherwise fallback to index
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
      dataIndex: "_id",
      key: "_id",
      render: (_id) => <p>{_id.slice(0, 5)}...</p>,
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
      title: "Phone Number",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
    },
    {
      title: "Joined",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => new Date(createdAt).toISOString().split('T')[0]
    },
    {
      title: "Earned",
      dataIndex: "monthlyEarnings",
      key: "monthlyEarnings",
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

  return (
    isLoading ? <p>Loading....</p> : <>
      <h1 className="text-2xl font-semibold  my-5">Users</h1>
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
      <Table
        columns={columns}
        dataSource={dataSource}
        // pagination={{ pageSize, onChange: () => setPageSize() }}
        // scroll={{ x: 1000 }}
        pagination={false}
      />
      <div className="flex justify-center py-6">
        <Pagination current={usersData?.data?.currentPage} onChange={onChange} total={usersData?.data?.totalUsers} />
      </div>
    </>
  );
};

export default Users;
