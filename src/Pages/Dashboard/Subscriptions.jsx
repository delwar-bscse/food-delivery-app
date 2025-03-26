import React, { useEffect, useState } from 'react'
import {  Popconfirm } from 'antd';
import { subscriptionPattern } from '../../assets/assets'
import { useDeleteSubscriptionMutation, useGlobalSubscriptionQuery } from '../../redux/apiSlices/subscriptionSlice'
import EditSubscription from '../../components/Shared/EditSubscription';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Subcriptions = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [singleSubscription, setSingleSubscription] = useState("");
  const [deleteSubscription] = useDeleteSubscriptionMutation();
  const { data: allSubscriptions, isLoading, refetch } = useGlobalSubscriptionQuery();
  const subscriptionDatas = allSubscriptions?.data || [];
  // console.log(subscriptionDatas)
  
  const showEditModal = (item) => {
    setSingleSubscription(item);
    setIsEditModalOpen(true);
  };

  const closeEditModal = (item) => {
    setIsEditModalOpen(false);
    refetch();
  };
  
  const handleDeleteSubscription = async(id) => {
    console.log("Delete Subscription id : ", id);
    await deleteSubscription(id);
    refetch();
  };

  useEffect(() => {
    refetch();
  }, []);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full overflow-hidden max-w-[1400px] mx-auto border border-gray-200 rounded-xl p-5">
      <div>
        <Link to="/subscriptions/create" className='bg-blue-500 text-white py-2 px-4 rounded-md inline-block'>Create New Subscription</Link>
      </div>
      {subscriptionDatas?.length <= 0 ? <p className='text-center text-2xl text-gray-600 py-5'>No Subscriptions Found</p> : <div className='grid grid-cols-2 xl:grid-cols-3 gap-10 p-10'>
        {subscriptionDatas?.map((item) => (
          <div key={item?._id} className='flex flex-col items-center gap-3 py-16 shadow-custom-card rounded-2xl bg-white bg-center bg-cover bg-no-repeat p-3' style={{ backgroundImage: `url(${subscriptionPattern})` }}>
            <p className='font-semibold text-4xl text-gray-700 pb-5'>{item?.type}</p>
            {/* <span className='text-gray-400'>Monthly Charge</span> */}
            <p className='text-3xl font-semibold text-blue-600'>${item?.price}</p>
            <p className='text-lg font-semibold text-gray-600'>Delivery Limit {item?.deliveryLimit}</p>
            <p className='font-semibold text-gray-400 text-center py-4'>{item?.description}</p>
            <div className='flex items-center justify-center gap-3'>
              <button onClick={() => showEditModal(item)} className='px-3 py-1 min-w-[100px] rounded-full bg-blue-500 text-white'>Edit</button>
              <Popconfirm
                title={<h2 className="text-red-600">Delete Subscription</h2>}
                description="Are you sure to delete this subscription?"
                onConfirm={() => handleDeleteSubscription(item?._id)}
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
                <button className='px-3 py-1 min-w-[100px] rounded-full bg-red-500 text-white'>Delete</button>
              </Popconfirm>
              
            </div>
          </div>
        ))}
        <>
          <EditSubscription singleSubscription={singleSubscription} isEditModalOpen={isEditModalOpen} closeEditModal={closeEditModal} />
        </>
      </div>}
    </div>
  )
}

export default Subcriptions