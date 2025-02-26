import React, { useState } from 'react';
import { Table, Button } from 'antd';
import { RiArrowUpDownFill } from "react-icons/ri";
import { viewRequestDatas } from '../../datas/ViewRequestDatas';

// Function to manually parse 'dd-mm-yy' to Date object
const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('-');
    return new Date(`20${year}-${month}-${day}`); // Fix the year to '20yy' format
};

const columns = [
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email Address',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Message',
        dataIndex: 'message',
        key: 'message',
        render: (text) => <p className='w-80 text-justify'>{text}</p>,
    },
    {
        title: 'Overview',
        key: 'overview',
        render: (_, record) => (
            <div className='flex justify-start items-center gap-3'>
                <button className='text-green-500 underline px-1 rounded-sm'>Solve</button>
                <button className='text-red-500 underline px-1 rounded-sm'>Delete</button>
            </div>
        ),
    },
];

const ViewRequests = () => {
    const [sortedData, setSortedData] = useState(viewRequestDatas);
    const [ascending, setAscending] = useState(true); // Track sort order

    const toggleSort = () => {
        // Clone the data to avoid direct mutation
        const sorted = [...sortedData].sort((a, b) => {
            // Convert 'dd-mm-yy' to Date objects using the parseDate function
            const dateA = parseDate(a.date);
            const dateB = parseDate(b.date);

            // Compare Date objects for sorting in ascending or descending order
            return ascending ? dateB - dateA : dateA - dateB;
        });

        // Update the sorted data and toggle the sorting direction
        setSortedData(sorted);
        setAscending(!ascending); // Toggle between ascending and descending
    };

    return (
        <div className="w-full overflow-hidden bg-white">
            {/* Button to toggle sorting */}
            <div className='flex justify-between items-center py-8 px-4'>
                <h2 className='font-semibold text-2xl'>Reports</h2>
                <Button
                    onClick={toggleSort}
                    style={{height: "40px"}}
                >
                    <span>{ascending ? 'Sort by latest' : 'Sort by oldest'}</span>
                    <span><RiArrowUpDownFill /></span>
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={sortedData}
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default ViewRequests;
