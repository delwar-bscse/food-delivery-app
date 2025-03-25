import React, { useState } from 'react'
import { Modal } from 'antd';
import { subscriptionPattern } from '../../assets/assets'
import { useGlobalSubscriptionQuery } from '../../redux/apiSlices/subscriptionSlice'
import EditSubscription from '../../components/Shared/EditSubscription';
import { Link } from 'react-router-dom';

const Subcriptions = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [singleSubscription, setSingleSubscription] = useState("");

  const showEditModal = (item) => {
    setSingleSubscription(item);
    setIsEditModalOpen(true);
  };
  const handleEditOk = () => {
    refetch();
    setIsEditModalOpen(false);
  };
  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };

  const {data:allSubscriptions,refetch} = useGlobalSubscriptionQuery();
  const subscriptionDatas = allSubscriptions?.subscriptions;

  return (
    <div className="w-full overflow-hidden max-w-[1400px] mx-auto">
    <div>
      <Link to="/subscriptions/create" className='bg-blue-500 text-white py-2 px-4 rounded-md inline-block'>Create New Subscription</Link>
    </div>
      <div className='grid grid-cols-2 xl:grid-cols-3 gap-10 p-16'>
        {subscriptionDatas?.map((item) => (
          <div key={item?._id} className='flex flex-col items-center gap-3 py-16 shadow-custom-card rounded-2xl bg-white bg-center bg-cover bg-no-repeat p-3' style={{backgroundImage: `url(${subscriptionPattern})`}}>
            <p className='font-semibold text-4xl text-gray-700 pb-5'>{item?.type}</p>
            {/* <span className='text-gray-400'>Monthly Charge</span> */}
            <p className='text-3xl font-semibold text-blue-600'>${item?.price}</p>
            <p className='text-lg font-semibold text-gray-600'>Delivery Limit {item?.deliveryLimit}</p>
            <p className='font-semibold text-gray-400 text-center py-4'>{item?.description}</p>
            <button onClick={() => showEditModal(item)} className='py-3 px-1 rounded-full bg-blue-500 text-white w-[80%] max-w-[300px] mx-auto'>Edit Details</button>
          </div>
        ))}
        <Modal footer={null} open={isEditModalOpen} onCancel={handleEditCancel} width={800} centered>
          <EditSubscription handleOk={handleEditOk} singleSubscription={singleSubscription} setSingleSubscription={setSingleSubscription} />
        </Modal>
      </div>
    </div>
  )
}

export default Subcriptions