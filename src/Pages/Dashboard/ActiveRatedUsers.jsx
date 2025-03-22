import React, { useEffect, useState } from "react";
import { Table, Space, Avatar, Select } from "antd";
import randomImg from "../../assets/randomProfile2.jpg";
import { Pagination } from 'antd';
import { useUpdateStatusMutation, useUsersQuery } from "../../redux/apiSlices/userSlice";
// import { useFreeDeliveryAssignMutation } from "../../redux/apiSlices/freeDeliverySlice";

const ActiveRatedUsers = () => {
  const [current, setCurrent] = useState(1);
  const [filterType, setFilterType] = useState("active");
  const { data: usersData, isLoading, refetch } = useUsersQuery({
    page: current,
    // filterType: filterType
  });
  // const [freeDeliveryAssign] = useFreeDeliveryAssignMutation();

  // console.log("Backend Data", usersData?.data?.users);
  const dataSource = usersData?.data?.users?.map((user, index) => ({
    ...user,
    key: user._id,
    id: index + 1,
  }));

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
      title: "Email | Number",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
      render: (_, record) => `${record?.email ? record?.email : record?.mobileNumber}`,
    },
    {
      title: "Rating",
      dataIndex: "",
      key: "",
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
        return <button  style={{ color }}>
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
        return <button  style={{ color }}>{isRestricted ? "Restricted" : "Active"}</button>;
      },
    }
  ];

  useEffect(() => {
    console.log(filterType, current);
    refetch({
      page: current,
      // filterType: filterType
    });
  }, [filterType, current]);

  


  return (
    isLoading ? <p>Loading....</p> : <>
      <div className="w-full flex items-center gap-5 pt-4">
        <h1 className="text-2xl font-semibold  my-5">Activity & Performance</h1>
        <div className="flex gap-3 justify-end">
          {/* Filter by email or number */}
          <div className="w-[240px]">
            <Select
              size="large"
              placeholder="Most Active Users"
              style={{
                width: "100%",
              }}
              onChange={(e) => {
                setFilterType(e);
                setCurrent(1);
              }}
              options={[
                {
                  value: 'active',
                  label: 'Most Active Users',
                },
                {
                  value: 'rate',
                  label: 'Highest Rated Users',
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
        scroll={{ x: 1000 }}
        pagination={false}
      />
      <div className="flex justify-center py-6">
        <Pagination current={usersData?.data?.currentPage} onChange={(e) => setCurrent(e)} total={usersData?.data?.totalUsers} />
      </div>
    </>
  );
};

export default ActiveRatedUsers;
