import React from "react";

import { Link } from "react-router-dom";
import { FaRegBell } from "react-icons/fa6";
import { SlArrowDown } from "react-icons/sl";
import { Badge } from "antd";
import { useFetchAdminProfileQuery } from "../../redux/apiSlices/authSlice";
import { ProfileImg } from "../../assets/assets";

const Header = () => {
  const { data: userData, isLoading } = useFetchAdminProfileQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center my-20 text-lg text-secondary">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex items-center gap-5 justify-end">
      <Link to="#" className="h-fit mt-[10px] cursor-pointer">
        <Badge count={5}>
          <FaRegBell color="#4E4E4E" size={24} />
        </Badge>
      </Link>

      <div className="flex gap-2 items-center justify-center cursor-pointer">
        <img
          style={{
            clipPath: "circle()",
            width: 45,
            height: 45,
          }}
          src={ ProfileImg }
          alt="person-male--v2"
          className="clip"
        />
        <div className="flex items-center gap-2">
          <p className="text-xl">{userData?.data?.name || "Anna Watson"}</p>
          <p>
            <SlArrowDown size={14} className="font-bold"/>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
