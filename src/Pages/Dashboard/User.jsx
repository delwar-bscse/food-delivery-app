import React, { useState } from "react";
import { ConfigProvider, Input, Rate, Tabs } from "antd";
import { useParams } from "react-router-dom";
import { GoStarFill } from "react-icons/go";
import UserOrder from "./UserOrder";
import { useUserByIdQuery } from "../../redux/apiSlices/userSlice";
import { refactorFileUrl } from "../../lib/filePathUrl";
import moment from "moment";


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


  const { data: singleUser, isLoading, isSuccess, isError, error, refetch } = useUserByIdQuery(id);
  // console.log(singleUser);
  const profile = singleUser?.profile;
  console.log(profile);

  // isLoading && <p>Loading...</p>

  return (
    <div className="p-6 bg-white rounded-xl">
      <div className="flex">
        <div className='grow space-y-8 py-6 pt-6'>
          <div className="flex items-start gap-6">
            {/* User Image */}
            <div className="w-60 h-60 overflow-hidden">
              {!profile?.Image && <img src={refactorFileUrl(profile?.image)} alt="" className="cover" />}
            </div>
            {/* User Details */}
            <div className="grid gap-6 grid-flow-col grid-rows-5">
              <p className=""><span className="font-semibold">Name :</span> {profile?.fullName || "N/A"}</p>
              <p className=""><span className="font-semibold"> Email : </span>{profile?.email || "N/A"}</p>
              <p className=""><span className="font-semibold"> Number : </span>{profile?.mobileNumber || "N/A"}</p>
              <div className="flex items-center gap-4">
                <div>
                  <span className="font-semibold">Rating : </span> <ConfigProvider theme={theme}><Rate size="small" disabled allowHalf defaultValue={profile?.stats?.avgRating} /></ConfigProvider> ( {profile?.stats?.avgRating} )
                </div>
                <button onClick={() => setIsShowReview(!isShowReview)} className={`text-white ${isShowReview ? "bg-green-400" : "bg-red-400"} px-4 py-1 rounded-full`}>Reviews</button>
              </div>
              <p><span className="font-semibold"> Address : </span>{profile?.address || "N/A"}</p>
              <p><span className="font-semibold"> Role : </span>{profile?.role}</p>
              <p><span className="font-semibold"> Subscription : </span>{profile?.isSubscribed ? "Subscribed" : "Unsubscribed"}</p>
              <p><span className="font-semibold"> Status : </span>{profile?.status}</p>
              <p><span className="font-semibold"> Total Refer : </span>{profile?.referCount}</p>
              <p><span className="font-semibold"> Joined : </span>{moment(profile?.createdAt).format("DD-MM-YYYY")}</p>
            </div>
          </div>
        </div>
        <button onClick={() => window.history.back()} className="text-white bg-gray-700 hover:bg-gray-600 px-5 py-1 rounded-lg h-10">Go Back</button>
      </div>
      {isShowReview && profile?.reviews?.length > 0 && <div className="h-[500px] overflow-y-auto grid grid-cols-3 my-6 gap-4 p-4 bg-gray-50 rounded-md border-2 border-gray-200">
        {profile?.reviews?.map((review, index) => (
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
