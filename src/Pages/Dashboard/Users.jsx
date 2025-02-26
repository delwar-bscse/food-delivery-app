import React, { useState } from "react";
import { Table, Button, Space, Avatar } from "antd";
import { Link } from "react-router-dom";

import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { LuView } from "react-icons/lu";
import randomImg from "../../assets/randomProfile2.jpg";

const Users = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  // Dummy data for users
  const users = {
    data: {
      data: [
        {
          id: "1",
          name: "John Doe",
          phoneNumber: "+123456789",
          joined: "4th Sept, 2023",
          earned: "30",
          status: "active",
          profileImg: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        {
          id: "2",
          name: "Jane Smith",
          phoneNumber: "+123456780",
          joined: "4th Oct, 2024",
          earned: "30",
          status: "deactive",
          profileImg: "https://randomuser.me/api/portraits/women/1.jpg",
        },
        {
          id: "3",
          name: "Alice Johnson",
          phoneNumber: "+123456781",
          joined: "15th Feb, 2023",
          earned: "50",
          status: "active",
          profileImg: "https://randomuser.me/api/portraits/women/2.jpg",
        },
        {
          id: "4",
          name: "Bob Brown",
          phoneNumber: "+123456782",
          joined: "12th Dec, 2022",
          earned: "70",
          status: "deactive",
          profileImg: "https://randomuser.me/api/portraits/men/2.jpg",
        },
        {
          id: "5",
          name: "Charlie Davis",
          phoneNumber: "+123456783",
          joined: "20th Jan, 2023",
          earned: "90",
          status: "active",
          profileImg: "https://randomuser.me/api/portraits/men/3.jpg",
        },
        {
          id: "6",
          name: "Diana Miller",
          phoneNumber: "+123456784",
          joined: "28th Mar, 2023",
          earned: "120",
          status: "active",
          profileImg: "https://randomuser.me/api/portraits/women/3.jpg",
        },
        {
          id: "7",
          name: "Edward Wilson",
          phoneNumber: "+123456785",
          joined: "19th Apr, 2022",
          earned: "130",
          status: "deactive",
          profileImg: "https://randomuser.me/api/portraits/men/4.jpg",
        },
        {
          id: "8",
          name: "Fiona Moore",
          phoneNumber: "+123456786",
          joined: "10th Oct, 2023",
          earned: "110",
          status: "active",
          profileImg: "https://randomuser.me/api/portraits/women/4.jpg",
        },
        {
          id: "9",
          name: "George Taylor",
          phoneNumber: "+123456787",
          joined: "5th Feb, 2023",
          earned: "150",
          status: "active",
          profileImg: "https://randomuser.me/api/portraits/men/5.jpg",
        },
        {
          id: "10",
          name: "Hannah Lee",
          phoneNumber: "+123456788",
          joined: "15th May, 2023",
          earned: "200",
          status: "deactive",
          profileImg: "https://randomuser.me/api/portraits/women/5.jpg",
        },
        {
          id: "11",
          name: "Ian Adams",
          phoneNumber: "+1234567891",
          joined: "3rd Aug, 2023",
          earned: "250",
          status: "active",
          profileImg: "https://randomuser.me/api/portraits/men/6.jpg",
        },
        {
          id: "12",
          name: "Julia Roberts",
          phoneNumber: "+1234567892",
          joined: "6th Nov, 2023",
          earned: "270",
          status: "active",
          profileImg: "https://randomuser.me/api/portraits/women/6.jpg",
        },
        {
          id: "13",
          name: "Kevin Wright",
          phoneNumber: "+1234567893",
          joined: "12th Sept, 2023",
          earned: "220",
          status: "deactive",
          profileImg: "https://randomuser.me/api/portraits/men/7.jpg",
        },
        {
          id: "14",
          name: "Lily Green",
          phoneNumber: "+1234567894",
          joined: "18th Apr, 2023",
          earned: "310",
          status: "active",
          profileImg: "https://randomuser.me/api/portraits/women/7.jpg",
        },
        {
          id: "15",
          name: "Michael Harris",
          phoneNumber: "+1234567895",
          joined: "27th Oct, 2023",
          earned: "330",
          status: "active",
          profileImg: "https://randomuser.me/api/portraits/men/8.jpg",
        },
        {
          id: "16",
          name: "Nina Clark",
          phoneNumber: "+1234567896",
          joined: "1st Feb, 2024",
          earned: "360",
          status: "deactive",
          profileImg: "https://randomuser.me/api/portraits/women/8.jpg",
        },
        {
          id: "17",
          name: "Oscar Lewis",
          phoneNumber: "+1234567897",
          joined: "9th Mar, 2023",
          earned: "380",
          status: "active",
          profileImg: "https://randomuser.me/api/portraits/men/9.jpg",
        },
        {
          id: "18",
          name: "Paul Walker",
          phoneNumber: "+1234567898",
          joined: "10th Nov, 2023",
          earned: "400",
          status: "active",
          profileImg: "https://randomuser.me/api/portraits/men/10.jpg",
        },
        {
          id: "19",
          name: "Quinn Scott",
          phoneNumber: "+1234567899",
          joined: "7th Oct, 2023",
          earned: "420",
          status: "deactive",
          profileImg: "https://randomuser.me/api/portraits/men/11.jpg",
        },
        {
          id: "20",
          name: "Rachel King",
          phoneNumber: "+1234567800",
          joined: "22nd Dec, 2023",
          earned: "450",
          status: "active",
          profileImg: "https://randomuser.me/api/portraits/women/9.jpg",
        },
        {
          id: "21",
          name: "Sam Young",
          phoneNumber: "+1234567801",
          joined: "19th Feb, 2024",
          earned: "470",
          status: "deactive",
          profileImg: "https://randomuser.me/api/portraits/men/12.jpg",
        },
        {
          id: "22",
          name: "Tina Baker",
          phoneNumber: "+1234567802",
          joined: "30th Sept, 2023",
          earned: "500",
          status: "active",
          profileImg: "https://randomuser.me/api/portraits/women/10.jpg",
        },
        {
          id: "23",
          name: "Ursula Mitchell",
          phoneNumber: "+1234567803",
          joined: "8th Mar, 2023",
          earned: "520",
          status: "active",
          profileImg: "https://randomuser.me/api/portraits/women/11.jpg",
        },
        {
          id: "24",
          name: "Victor Robinson",
          phoneNumber: "+1234567804",
          joined: "11th Jan, 2024",
          earned: "540",
          status: "deactive",
          profileImg: "https://randomuser.me/api/portraits/men/13.jpg",
        },
        {
          id: "25",
          name: "Wendy Harris",
          phoneNumber: "+1234567805",
          joined: "17th Nov, 2023",
          earned: "560",
          status: "active",
          profileImg: "https://randomuser.me/api/portraits/women/12.jpg",
        }
      ]

    },
  };

  const data = users?.data?.data;

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => {
        const name = record.name || "Unknown";
        const imgUrl = record.profileImg || randomImg;
        const fullImgUrl = imgUrl.startsWith("http")
          ? imgUrl
          : `${import.meta.env.VITE_BASE_URL}${imgUrl}`;

        return (
          <Space>
            <Avatar src={fullImgUrl} alt={name} size="large" />
            <span>{name}</span>
          </Space>
        );
      },
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Joined",
      dataIndex: "joined",
      key: "joined",
    },
    {
      title: "Earned",
      dataIndex: "earned",
      key: "earned",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color;
        switch (status) {
          case "active":
            color = "green";
            break;
          case "deactive":
            color = "red";
            break;
          default:
            color = "black";
        }

        return <span style={{ color }}>{status}</span>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className='flex justify-start items-center gap-3'>
          <button className='text-white bg-yellow-500 p-1 rounded-sm'><LuView size={20} /></button>
          <button className='text-white bg-red-500 p-1 rounded-sm'><RiDeleteBin5Line size={20} /></button>
        </div>
      ),
    },
  ];

  return (
    <>
      <h1 className="text-2xl font-semibold  my-5">Users</h1>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize, onChange: () => setPageSize() }}
        scroll={{ x: 1000 }}
      />
    </>
  );
};

export default Users;
