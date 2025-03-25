import React, { useState } from 'react';
import { Modal } from 'antd';
import { RxSpeakerLoud } from "react-icons/rx";
import { useCreateNewAnnouncmentMutation, useGetAllAnnouncmentQuery } from '../../redux/apiSlices/announcementSlice';
import moment from 'moment/moment';

const Announcements = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [singleAnnouncement, setSingleAnnouncement] = useState({
        title: '',
        description: '',
    });
    
    const [createNewAnnouncment] = useCreateNewAnnouncmentMutation();
    const { data, isLoading, refetch } = useGetAllAnnouncmentQuery();
    // console.log("Announcement data:", data);

    const handleOpenChange = (e) => {
        setSingleAnnouncement({ ...singleAnnouncement, [e.target.name]: e.target.value });
    };

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        if (singleAnnouncement?.title && singleAnnouncement?.description) {
            createNewAnnouncment(singleAnnouncement);
            refetch();
            console.log(singleAnnouncement);
        };
        setSingleAnnouncement({
            title: '',
            description: '',
        })
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className='min-h-[calc(100vh-200px)] bg-white rounded-xl p-5 space-y-3'>
                <button onClick={showModal} className='bg-gray-800 text-white py-2 px-5 rounded-md'>Publish Announcements</button>
                <Modal footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={800} centered>
                    <div className='space-y-8 p-6 pt-16'>
                        <h2 className='text-2xl font-semibold text-center'>Write Announcements</h2>
                        
                        <input onChange={handleOpenChange} name='title' value={singleAnnouncement?.title} type="text" placeholder='Announcement Title' className='w-full border border-gray-400 p-3 rounded-md focus:outline-none focus:border-gray-500 bg-gray-50 focus:bg-white' />
                        
                        <textarea onChange={handleOpenChange} name='description' value={singleAnnouncement?.description} type='text' className='w-full h-72 border border-gray-400 p-3 rounded-md focus:outline-none focus:border-gray-500 bg-gray-50 focus:bg-white' placeholder='Announcement Description...'></textarea>
                        
                        <div className='flex justify-end'>
                            <button onClick={handleOk} className='bg-gray-800 text-white py-2 px-5 rounded-md'>
                                Publish Announcements
                            </button>
                        </div>
                    </div>
                </Modal>
                <div className='space-y-4'>
                    {data?.map((data, index) => (
                        <div key={index} className='flex items-start gap-2 border border-gray-400 p-5 rounded-xl'>
                            <div className='py-1'>
                                <RxSpeakerLoud className='text-xl' />
                            </div>
                            <div className='space-y-3 flex-1'>
                                <p className='flex flex-col border-b border-gray-200 pb-3'>
                                    <span className='font-semibold text-gray-800 text-lg'>
                                        Ivan
                                        <span className='font-light text-gray-600'> Published : </span>
                                        {data?.title}
                                    </span>
                                    <span className='text-gray-500 text-xs'>{moment(data?.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                                </p>
                                <p className='text-gray-600 text-sm'>{data?.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Announcements