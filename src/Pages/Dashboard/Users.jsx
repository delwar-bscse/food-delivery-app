import React, { useEffect, useState } from "react";
import { Table, Space, Avatar, Select, Button, Popconfirm } from "antd";
import { LuView } from "react-icons/lu";
import randomImg from "../../assets/randomProfile2.jpg";
import { MdOutlineDeleteForever } from "react-icons/md";
import { GoStarFill } from "react-icons/go";
import { Pagination } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useUpdateStatusMutation, useUsersQuery } from "../../redux/apiSlices/userSlice";
import { useFreeDeliveryAssignMutation } from "../../redux/apiSlices/freeDeliverySlice";
import { Link } from "react-router-dom";

const Users = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [freeDelivery, setFreeDelivery] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [filterType, setFilterType] = useState("");
  const [isSorting, setIsSorting] = useState(true);

  const [updateStatus] = useUpdateStatusMutation();
  const { data: usersData, isLoading, refetch } = useUsersQuery({
    page: pageNumber,
    filterType: filterType
  });
  const [freeDeliveryAssign] = useFreeDeliveryAssignMutation();

  // console.log("Backend Data", usersData?.data?.users);
  const dataSource = usersData?.data?.users?.map((user, index) => ({
    ...user,
    key: user._id,
    id: index + 1,
  }));

  const handleUpdateStatus = async (record) => {
    await updateStatus({
      userId: record._id,
      isRestricted: record.isRestricted ? false : true
    }).unwrap();
    refetch();
  }

  const handleDeleteUser = async (record) => {
    console.log(record._id);
  }

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (fullName, record) => {
        const name = record?.fullName || "Unknown";
        const imgUrl = record?.profileImg;
        const fullImgUrl = (imgUrl?.startsWith("http")
          ? imgUrl
          : `${import.meta.env.VITE_BASE_URL}${imgUrl}`);

        return (
          <div className="flex items-center gap-2">
            <Avatar src={randomImg} alt={name} size="large" />
            <span>{name}</span>
          </div>
        );
      },
    },
    {
      title: "Rating",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      render: (_, record) => (
        <div className="flex items-center rounded-full gap-1 bg-yellow-500 text-white px-3 py-1 max-w-16">
          <span><GoStarFill /></span>
          <span>4.5</span>
        </div>
      )
    },
    {
      title: "Number",
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
      title: "Subscription",
      dataIndex: "isSubscribed",
      key: "isSubscribed",
      render: (isSubscribed) => {
        let color = isSubscribed ? "green" : "red"
        return <button style={{ color }}>
          {isSubscribed ? "Subscribed" : "Unsubscribed"}
        </button>
      }
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
          <Link to={`/users/${record._id}`} className='text-white bg-yellow-500 p-1 rounded-sm'><LuView size={20} /></Link>
          <Popconfirm
            title= {<h2 className="text-red-600">Delete the User</h2>}
            description="Are you sure to delete this User?"
            onConfirm={() => handleDeleteUser(record)}
            placement="topLeft"
            okText="Delete"
            icon={
              <QuestionCircleOutlined
                style={{
                  color: 'red',
                }}
              />
            }
          >
            <button className='text-white bg-red-500 p-1 rounded-sm'><MdOutlineDeleteForever size={20} /></button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  // const handleChange = (value) => {
  //   console.log(`selected ${value}`);
  // };

  useEffect(() => {
    console.log(filterType, pageNumber);
    refetch({
      page: pageNumber,
      filterType: filterType
    });
  }, [filterType, pageNumber]);

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
          {filterType !== '' && <div>
            <Button onClick={() => setIsSorting(!isSorting)} size="large">{isSorting ? 'Ascending' : 'Descending'}</Button>
          </div>}
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
                setPageNumber(1);
              }}
              options={[
                {
                  value: '',
                  label: 'All',
                },
                {
                  value: 'rating',
                  label: 'Rating',
                },
                {
                  value: 'earning',
                  label: 'Earning',
                }
              ]}
            />
          </div>
        </div>
      </div>
      {/* Users Table */}
      <Table
        columns={columns}
        dataSource={dataSource}
        // rowSelection={rowSelection}
        scroll={{ x: 1000 }}
        pagination={false}
      />
      <div className="flex justify-center py-6">
        <Pagination current={usersData?.data?.currentPage} onChange={(e) => setPageNumber(e)} total={usersData?.data?.totalUsers} />
      </div>
    </>
  );
};

export default Users;
