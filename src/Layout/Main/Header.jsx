import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegBell } from "react-icons/fa6";
import { Badge } from "antd";
import { imageUrl } from "../../redux/api/baseApi";
import { ProfileImg } from "../../assets/assets";
import { useFetchAdminProfileQuery } from "../../redux/apiSlices/authSlice";
import { refactorFileUrl } from "../../lib/filePathUrl";

const Header = () => {
  const [imageUrlNew, setImageUrlNew] = useState(null);
  const { data: userData, isLoading } = useFetchAdminProfileQuery();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center my-20 text-lg text-secondary">
        Loading...
      </div>
    );
  }

  const user = userData?.data;
  // console.log(refactorFileUrl(user?.image));

  
  return (
    <div className="flex items-center gap-5 justify-end">
      {/* <Link to="#" className="h-fit mt-[10px] cursor-pointer">
        <Badge count={5}>
          <FaRegBell color="#4E4E4E" size={24} />
        </Badge>
      </Link> */}

      <div className="flex gap-2 items-center justify-center cursor-pointer px-4">
        <img style={{
          clipPath: "circle()",
          width: 45,
          height: 45,
        }} 
        className="clip" 
        src={`${refactorFileUrl(user?.image)}`} alt="profile" 
        />
        <div className="flex items-center gap-2">
          <p className="text-xl">{user?.fullName
            || "Anna Watson"}</p>
          {/* <p>
            <SlArrowDown size={14} className="font-bold" />
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
