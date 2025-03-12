import React, { useState } from 'react'
import { Modal } from 'antd';
// import { subscriptionDatas } from '../../datas/subscriptionDatas'
import { Link } from 'react-router-dom'
import { subscriptionPattern } from '../../assets/assets'
import { useGlobalSubscriptionQuery } from '../../redux/apiSlices/subscriptionSlice'
import EditSubscription from '../../components/Shared/EditSubscription';

const Subcriptions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [singleSubscription, setSingleSubscription] = useState("");

  const showModal = (item) => {
    setSingleSubscription(item);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    refetch();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const {data:allSubscriptions,refetch} = useGlobalSubscriptionQuery();
  const subscriptionDatas = allSubscriptions?.subscriptions;
  // console.log("Subscriptions: ",allSubscriptions?.subscriptions);

  return (
    <div className="w-full overflow-hidden max-w-[1400px] mx-auto">
      <div className='grid grid-cols-3 gap-10 p-16'>
        {subscriptionDatas?.map((item) => (
          <div key={item?._id} className='flex flex-col items-center gap-3 py-16 shadow-custom-card rounded-2xl bg-white bg-center bg-cover bg-no-repeat' style={{backgroundImage: `url(${subscriptionPattern})`}}>
            <p className='font-semibold text-xl'>{item?.type}</p>
            <span className='text-gray-400'>Monthly Charge</span>
            <p className='text-5xl font-semibold text-blue-600'>{item?.price}</p>
            {/* <ul className='flex flex-col gap-8 items-center my-5 py-5 border-y-2 border-gray-200 text-gray-500'>
              {item?.facilities?.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul> */}
            <button onClick={() => showModal(item)} className='py-3 px-7 rounded-full bg-blue-600 text-white w-full max-w-[300px] mx-auto'>Edit Details</button>
          </div>
        ))}
        <Modal footer={null} open={isModalOpen} onCancel={handleCancel} width={800} centered>
          <EditSubscription handleOk={handleOk} singleSubscription={singleSubscription} setSingleSubscription={setSingleSubscription} />
        </Modal>
      </div>
    </div>
  )
}

export default Subcriptions