import React from 'react';
import { product01 } from '../../assets/assets';

const OrderDetails = () => {
  const orderDetails = {
    productImages: "https://via.placeholder.com/150",
    senderName: "Joshua",
    receiverName: "Arial",
    deliveryMan: "Jhon",
    ratings: 4.5,
    deliveryTime: "12:08 PM, Fri 8 Nov, 2025",
    currentLocation: "4 Lebri Mark, Petah Tikva.",
    price: 150,
    description: "This is a high-quality product designed to meet all your needs. It is made with durable materials and offers great functionality. Ideal for daily use, it is both stylish and practical, making it a must-have for everyone."
  };

  return (
    <div className='bg-white p-4 rounded-xl flex justify-center'>
      <div className=' p-4  max-w-[1000px]'>
        <h1 className='text-2xl font-bold pb-4 border-b-2 mb-4'>Order Details</h1>
        <div className='flex gap-4'>
          {/* Product Image */}
          <div>
            <img src={product01} alt="Product" className='w-[300px]' />
          </div>

          {/* Product Info */}
          <div>
            <div>
              <p><strong>Sender's Name:</strong> {orderDetails.senderName}</p>
              <p><strong>Receiver's Name:</strong> {orderDetails.receiverName}</p>
              <p><strong>Delivery Man:</strong> {orderDetails.deliveryMan}</p>
              <p><strong>Delivery Time:</strong> {orderDetails.deliveryTime}</p>
              <p><strong>Current Location:</strong> {orderDetails.currentLocation}</p>
              <p><strong>Price:</strong> ${orderDetails.price}</p>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div style={{ marginTop: '20px', fontSize: '16px', lineHeight: '1.6' }}>
          <p><strong>Description:</strong></p>
          <p>{orderDetails.description}</p>
        </div>

        <div className='grid grid-cols-2 border rounded-xl p-4 gap-4 mt-4'>
          <div>
            <h2 className='font-semibold text-2xl border-b mb-3 pb-1'>Sender</h2>
            <div className="grid gap-2 grid-flow-col grid-rows-5">
              <p className=""><span className="font-semibold">Name :</span> {"Ivan" || "N/A"}</p>
              <p className=""><span className="font-semibold"> Email : </span>{"example@gmail.com" || "N/A"}</p>
              <p className=""><span className="font-semibold"> Number : </span>{"0123456789" || "N/A"}</p>
              <p><span className="font-semibold"> Address : </span>{"Dhaka, Bangladesh" || "N/A"}</p>
            </div>
          </div>
          <div>
            <h2 className='font-semibold text-2xl border-b mb-3 pb-1'>Delivery Man</h2>
            <div className="grid gap-2 grid-flow-col grid-rows-5">
              <p className=""><span className="font-semibold">Name :</span> {"Ivan" || "N/A"}</p>
              <p className=""><span className="font-semibold"> Email : </span>{"example@gmail.com" || "N/A"}</p>
              <p className=""><span className="font-semibold"> Number : </span>{"0123456789" || "N/A"}</p>
              <p><span className="font-semibold"> Address : </span>{"Dhaka, Bangladesh" || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
