import React, { useEffect, useState } from "react";
import { Table, Avatar, Select, Button, Popconfirm } from "antd";
import { LuView } from "react-icons/lu";
import randomImg from "../../assets/randomProfile2.jpg";
import { MdOutlineDeleteForever } from "react-icons/md";
import { GoStarFill } from "react-icons/go";
import { Pagination } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useUpdateStatusMutation, useUserDeleteByIdMutation, useUsersQuery } from "../../redux/apiSlices/userSlice";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { refactorFileUrl } from "../../lib/filePathUrl";

const Users = () => {
  // const [pageNumber, setPageNumber] = useState(1);
  // const [limit, setLimit] = useState(10);
  // const [filterType, setFilterType] = useState("");
  // const [isSorting, setIsSorting] = useState(true);
  const navigation = useNavigate();
  const [searchParams] = useSearchParams();
  console.log(searchParams);

  // const searchData = new URLSearchParams(params[0]);

  const pageNumber = +searchParams.get('page') || 1;
  const limit = +searchParams.get('limit') || 10;
  const filterType = searchParams.get('filterType') || '';
  const isSorting = searchParams.get('isSorting') === "true" ? true : false;
  

  const [updateStatus] = useUpdateStatusMutation();
  const [userDeleteById] = useUserDeleteByIdMutation();
  const { data: usersData, isLoading, refetch } = useUsersQuery({
    page: pageNumber,
    limit: limit,
    filterType: filterType,
    sortBy: filterType,
    sortOrder: isSorting ? "asc" : "desc"
  });

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
    await userDeleteById(record._id).unwrap();
    refetch();
    toast.success("User deleted successfully!");
  }

  useEffect(() => {
    refetch();
  }, [filterType, pageNumber, isSorting]);

  const handlePagination = (page, pageSize) => {
        navigation(`?page=${page}&limit=${pageSize}&filterType=${filterType}&isSorting=${isSorting}`);
    };

  //Table Columns
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
        const name = fullName || "Unknown";
        return (
          <div className="flex items-center gap-2">
            <Avatar src={refactorFileUrl(record?.image)} alt={name} size="large" />
            <span>{name}</span>
          </div>
        );
      },
    },
    {
      title: "Rating",
      dataIndex: "avgRating",
      key: "avgRating",
      render: (avgRating) => (
        <div className="flex items-center rounded-full gap-1 bg-yellow-500 text-white px-3 py-1 max-w-16">
          <span><GoStarFill /></span>
          <span>{avgRating}</span>
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
            title={<h2 className="text-red-600">Delete the User</h2>}
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

  // Filter Options
  const options = [
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
  ]


  return (
    isLoading ? <p>Loading....</p> : <>
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold  my-5">Users</h1>
        <div className="flex gap-3 justify-end">
          {filterType !== '' && <div>
            <Button onClick={() => navigation(`?page=${1}&limit=${10}&filterType=${filterType}&isSorting=${!isSorting}`)} size="large">{isSorting ? 'Ascending' : 'Descending'}</Button>
          </div>}
          {/* Filter by email or number */}
          <div className="w-[200px]">
            <Select
              size="large"
              placeholder={`${filterType === "" ? "All" : filterType}`}
              style={{
                width: "100%",
              }}
              onChange={(e) => {
                navigation(`?page=${1}&limit=${10}&filterType=${e}&isSorting=${true}`);
              }}
              options={options}
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
        <Pagination current={usersData?.data?.currentPage} onChange={handlePagination} total={usersData?.data?.totalUsers} showSizeChanger={false} />
      </div>
    </>
  );
};

export default Users;
