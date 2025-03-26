import React, { useState } from "react";
import { ConfigProvider, Input, Rate, Tabs } from "antd";
import {  useParams } from "react-router-dom";
import { GoStarFill } from "react-icons/go";
import { ProfileImg } from "../../assets/assets";
import UserOrder from "./UserOrder";
import { useUserByIdQuery } from "../../redux/apiSlices/userSlice";

const reviews = [
  {
    name: "Ivan",
    review: "The delivery was good. I received my delivery on time.",
    rating: 4.5
  },
  {
    name: "Maria",
    review: "Great experience! The product arrived faster than expected.",
    rating: 5
  },
  {
    name: "John",
    review: "Delivery was delayed, but customer service was helpful in resolving the issue.",
    rating: 3.5
  },
  {
    name: "Alice",
    review: "Excellent! I received my item in perfect condition and on time.",
    rating: 5
  },
  {
    name: "David",
    review: "The packaging could have been better, but the delivery was on schedule.",
    rating: 4
  },
  {
    name: "Ivan",
    review: "The delivery was good. I received my delivery on time.",
    rating: 4.5
  },
  {
    name: "Maria",
    review: "Great experience! The product arrived faster than expected.",
    rating: 5
  },
  {
    name: "John",
    review: "Delivery was delayed, but customer service was helpful in resolving the issue.",
    rating: 3.5
  },
  {
    name: "Alice",
    review: "Excellent! I received my item in perfect condition and on time.",
    rating: 5
  },
  {
    name: "David",
    review: "The packaging could have been better, but the delivery was on schedule.",
    rating: 4
  },
  {
    name: "Ivan",
    review: "The delivery was good. I received my delivery on time.",
    rating: 4.5
  },
  {
    name: "Maria",
    review: "Great experience! The product arrived faster than expected.",
    rating: 5
  },
  {
    name: "John",
    review: "Delivery was delayed, but customer service was helpful in resolving the issue.",
    rating: 3.5
  },
  {
    name: "Alice",
    review: "Excellent! I received my item in perfect condition and on time.",
    rating: 5
  },
  {
    name: "David",
    review: "The packaging could have been better, but the delivery was on schedule.",
    rating: 4
  },
  {
    name: "Ivan",
    review: "The delivery was good. I received my delivery on time.",
    rating: 4.5
  },
  {
    name: "Maria",
    review: "Great experience! The product arrived faster than expected.",
    rating: 5
  },
  {
    name: "John",
    review: "Delivery was delayed, but customer service was helpful in resolving the issue.",
    rating: 3.5
  },
  {
    name: "Alice",
    review: "Excellent! I received my item in perfect condition and on time.",
    rating: 5
  },
  {
    name: "David",
    review: "The packaging could have been better, but the delivery was on schedule.",
    rating: 4
  },
  {
    name: "Ivan",
    review: "The delivery was good. I received my delivery on time.",
    rating: 4.5
  },
  {
    name: "Maria",
    review: "Great experience! The product arrived faster than expected.",
    rating: 5
  },
  {
    name: "John",
    review: "Delivery was delayed, but customer service was helpful in resolving the issue.",
    rating: 3.5
  },
  {
    name: "Alice",
    review: "Excellent! I received my item in perfect condition and on time.",
    rating: 5
  },
  {
    name: "David",
    review: "The packaging could have been better, but the delivery was on schedule.",
    rating: 4
  },
  {
    name: "Ivan",
    review: "The delivery was good. I received my delivery on time.",
    rating: 4.5
  },
  {
    name: "Maria",
    review: "Great experience! The product arrived faster than expected.",
    rating: 5
  },
  {
    name: "John",
    review: "Delivery was delayed, but customer service was helpful in resolving the issue.",
    rating: 3.5
  },
  {
    name: "Alice",
    review: "Excellent! I received my item in perfect condition and on time.",
    rating: 5
  },
  {
    name: "David",
    review: "The packaging could have been better, but the delivery was on schedule.",
    rating: 4
  },
];


const User = () => {
  const { id } = useParams();
  const [isShowReview, setIsShowReview] = useState(false);

  const theme = {
    components: {
      Rate: {
        starSize: 16
      },
    },
  }

  // Sample user data
  const user = {
    _id: "67d4ee5a2eea3253afe72eba",
    firstName: "Rifatuzzaman",
    lastName: "Shanto",
    email: "asadshanto310@gmail.com",
    role: "USER",
    stripeCustomerId: "cus_RweKxQUfNiTzC5",
    image: "https://i.ibb.co/z5YHLV9/profile.png",
    status: "active",
    stripe_account_id: null,
    verified: true,
    referCount: 0,
    readTerms: false,
    workTerms: false,
    operationTerms: false,
    createdAt: "2025-03-15T03:04:58.096Z",
    updatedAt: "2025-03-15T06:43:16.230Z",
    __v: 0
  };
  
  const { data: singleUser, isLoading, isSuccess, isError, error, refetch} = useUserByIdQuery(id);
  console.log( singleUser );
  const {fullName, mobileNumber, profileImage, freeDeliveries, totalOrders, subscriptionType, isVerified, stats} = isSuccess && singleUser?.profile;


  const imgUrl =
    user?.imgUrl ||
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmtj40PvvTQ1g64pgKZ2oKEk-tqT9rA4CXSA&s";

  return (
    <div className="p-6 bg-white rounded-xl">
      <div className="">
        <div className='space-y-8 py-6 pt-6'>
          <div className="flex items-start gap-6">
            {/* User Image */}
            <div>
              <img src={ProfileImg} alt="" className="rounded-xl" width={200} height={200} />
            </div>
            {/* User Details */}
            <div className="grid gap-6 grid-flow-col grid-rows-5">
              <p className=""><span className="font-semibold">Name :</span> {fullName || "N/A"}</p>
              <p className=""><span className="font-semibold"> Email : </span>{user?.email || "N/A"}</p>
              <p className=""><span className="font-semibold"> Number : </span>{mobileNumber || "N/A"}</p>
              <div className="flex items-center gap-4">
                <div>
                <span className="font-semibold">Rating : </span> <ConfigProvider theme={theme}><Rate size="small" disabled allowHalf defaultValue={stats?.avgRating} /></ConfigProvider> ( {stats?.avgRating} )
                </div>
                <button onClick={() => setIsShowReview(!isShowReview)} className={`text-white ${isShowReview ? "bg-green-400" : "bg-red-400"} px-4 py-1 rounded-full`}>Reviews</button>
              </div>
              <p><span className="font-semibold"> Address : </span>{user?.address || "N/A"}</p>
              <p><span className="font-semibold"> Role : </span>{user?.role}</p>
              <p><span className="font-semibold"> Subscription : </span>{user?.isSubscribed ? "Subscribed" : "Unsubscribed"}</p>
              <p><span className="font-semibold"> Status : </span>{user?.status}</p>
              <p><span className="font-semibold"> Total Refer : </span>{user?.referCount}</p>
              <p><span className="font-semibold"> Joined : </span>{user?.createdAt}</p>
            </div>
          </div>
        </div>
      </div>
      {isShowReview &&<div className="h-[500px] overflow-y-auto grid grid-cols-3 my-6 gap-4 p-4 bg-gray-50 rounded-md border-2 border-gray-200">
          {reviews.map((review, index) => (
            <div key={index} className=" bg-white p-4 rounded-md">
              <div className="flex items-center gap-2">
                <p className="text-xl text-semibold">{review.name}</p>
                <div className="flex items-center rounded-full gap-1 bg-yellow-500 text-white px-3 max-w-16">
                  <span><GoStarFill /></span>
                  <span>4.5</span>
                </div>
              </div>
              <p className="mt-2 text-gray-500">{review.review}</p>
            </div>
          ))}
        </div>}
      <div>
        <UserOrder />
      </div>
    </div>
  );
};

export default User;
