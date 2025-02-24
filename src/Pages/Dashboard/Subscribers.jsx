import React, { useState } from 'react';
import Title from '../../components/common/Title';
import { ConfigProvider, Input, Table } from 'antd';
 
 const data = [
    {
        key: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        country: "USA",
    },
    {
        key: "2",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        country: "USA",
    },
    {
        key: "3",
        name: "Michael Johnson",
        email: "michael.johnson@example.com",
        country: "USA",
    },
    {
        key: "4",
        name: "Emily Davis",
        email: "emily.davis@example.com",
        country: "USA",
    },
    {
        key: "5",
        name: "Chris Brown",
        email: "chris.brown@example.com",
        country: "USA",
    },
    {
        key: "6",
        name: "Sophia Wilson",
        email: "sophia.wilson@example.com",
        country: "USA",
    },
    {
        key: "7",
        name: "David Taylor",
        email: "david.taylor@example.com",
        country: "USA",
    },
    {
        key: "8",
        name: "Olivia Martinez",
        email: "olivia.martinez@example.com",
        country: "USA",
    },
];

const Subscribers = () => { 

    const [search, setSearch] = useState("") 
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    const columns = [
        {
            title: "Serial No.",
            dataIndex: "name",
            key: "name",
            render: (_,record, index) =><p>{((page - 1) * itemsPerPage) + index + 1}</p>
        },
        {
            title: "User Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "EMAIL",
            dataIndex: "email",
            key: "email",
        },       
        {
            title: "Country",
            dataIndex: "country",
            key: "country",
           
        },
   
    ];

    return (
        <div>
           <div className='flex items-center justify-between mb-4'>
                <Title >Subscribers</Title>
                <Input
                    style={{
                        width: 300, 
                        height: 40,
                        outline: "none",
                        border: "1px solid #d9d9d9",
                        boxShadow: "none"
                    }}
                    placeholder="Search.."
                    onChange={(e)=>setSearch(e.target.value)}
                />
            </div>

            <ConfigProvider
                theme={{
                    components: {
                        Pagination: {
                            itemActiveBg: "#007BA5",
                            borderRadius: "100%"
                        }
                    },
                    token:{
                        colorPrimary: "white"
                    }
                }}
            >
                <Table 
                    columns={columns} 
                    dataSource={data} 
                    pagination={{
                        current: parseInt(page),
                        onChange: (page)=> setPage(page)
                    }}
                />
            </ConfigProvider>
        </div>
    );
};

export default Subscribers;