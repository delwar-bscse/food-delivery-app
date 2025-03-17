import React from "react";
import { ConfigProvider, Input, Rate, Tabs } from "antd";
import { Link, useParams } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";
import RunningOrderTable from "../../components/ui/Analytics/RunningOrderTable";
import { ProfileImg } from "../../assets/assets";

const User = () => {
  const { id } = useParams();

  const theme={
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


  const imgUrl =
    user?.imgUrl ||
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmtj40PvvTQ1g64pgKZ2oKEk-tqT9rA4CXSA&s";

  return (
    <div className="p-6 bg-white rounded-xl">
      <div className="">
        <div className='space-y-8 p-6 pt-6'>
          <div className="flex items-start gap-4">
            {/* User Image */}
            <div>
              <img src={ProfileImg} alt="" className="rounded-xl" width={200} height={200} />
            </div>
            {/* User Details */}
            <div className="grid gap-4 grid-flow-col grid-rows-6">
              <p className=""><span className="font-semibold">Name :</span> {user?.firstName} {user?.lastName}</p>
              <p className=""><span className="font-semibold"> Email : </span>{user?.email || "N/A"}</p>
              <p className=""><span className="font-semibold"> Number : </span>{user?.mobileNumber || "N/A"}</p>
              <div className="">
              <span className="font-semibold">Rating : </span> <ConfigProvider theme={theme}><Rate size="small" disabled allowHalf defaultValue={2.5} /></ConfigProvider> (2.5)
              </div>
              <p><span className="font-semibold"> Address : </span>{user?.address || "N/A"}</p>
              <p><span className="font-semibold"> Stripe Account : </span>{user?.stripe_account_id || "N/A"}</p>
              <p><span className="font-semibold"> Role : </span>{user?.role}</p>
              <p><span className="font-semibold"> Subscription : </span>{user?.isSubscribed ? "Subscribed" : "Unsubscribed"}</p>
              <p><span className="font-semibold"> Status : </span>{user?.status}</p>
              <p><span className="font-semibold"> Total Refer : </span>{user?.referCount}</p>
              <p><span className="font-semibold"> Joined : </span>{user?.createdAt}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <RunningOrderTable
          filterProps={
            user?.vendor?.name || user?.admin?.name || user?.customer?.name
          }
        />
      </div>
    </div>
  );
};

export default User;
