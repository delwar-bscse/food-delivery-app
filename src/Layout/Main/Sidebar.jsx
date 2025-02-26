import { ConfigProvider, Menu } from "antd";
import React, { useEffect, useState } from "react";
import {
  MdCancelPresentation,
  MdCategory,
  MdFeaturedPlayList,
  MdMiscellaneousServices,
} from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { TbUserScreen } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

import { PiUserPlus } from "react-icons/pi";
import { LuLayoutDashboard } from "react-icons/lu";
import Cookies from "js-cookie";
import logo from "../../assets/barberMeLogo.png";
import { DiGoogleAnalytics } from "react-icons/di";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaMoneyBillTransfer, FaScissors } from "react-icons/fa6";
import { FaBorderStyle } from "react-icons/fa";
// import { LuUserRound } from "react-icons/lu";
import { LuUser } from "react-icons/lu";
import { IoCubeOutline } from "react-icons/io5";
import { PiUsersThree } from "react-icons/pi";
import { RiFileList2Line } from "react-icons/ri";
import { RiDiscountPercentLine } from "react-icons/ri";
import { LuClipboardList } from "react-icons/lu";
import { TbUserCircle } from "react-icons/tb";

import { DeliveryLogo } from "../../assets/assets";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const [selectedKey, setSelectedKey] = useState("");
  const [openKeys, setOpenKeys] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("refreshToken");
    Cookies.remove("refreshToken");
    navigate("/auth/login");
  };

  const menuItems = [
    {
      key: "/",
      icon: <LuLayoutDashboard size={24} />,
      label: (
        <Link to="/" className="">
          Dashboard
        </Link>
      ),
    },
    {
      key: "/users",
      icon: <LuUser size={24} />,
      label: <Link to="/users">Users</Link>,
    },
    {
      key: "/order-management",
      icon: <IoCubeOutline size={24} />,
      label: <Link to="/order-management">Order Management</Link>,
    },
    {
      key: "/announcements",
      icon: <PiUsersThree size={24} />,
      label: <Link to="/announcements">Announcements</Link>,
    },
    {
      key: "/view-reports",
      icon: <RiFileList2Line size={24} />,
      label: <Link to="/view-reports">View Reports</Link>,
    },
    {
      key: "/subscriptions",
      icon: <RiDiscountPercentLine size={24} />,
      label: <Link to="/subscriptions">Subscriptions</Link>,
    },
    {
      key: "/terms-conditions",
      icon: <LuClipboardList size={24} />,
      label: <Link to="/terms-conditions">Terms & Conditions</Link>,
    },
    {
      key: "/edit-profile",
      icon: <TbUserCircle size={24} />,
      label: <Link to="/profile">Edit Profile</Link>,
    },
    // {
    //   key: "/change-password",
    //   icon: <TbUserCircle size={24} />,
    //   label: <Link to="/change-password">Change Password</Link>,
    // },
  ];

  useEffect(() => {
    const selectedItem = menuItems.find(
      (item) =>
        item.key === path || item.children?.some((sub) => sub.key === path)
    );

    if (selectedItem) {
      setSelectedKey(path);

      if (selectedItem.children) {
        setOpenKeys([selectedItem.key]);
      } else {
        const parentItem = menuItems.find((item) =>
          item.children?.some((sub) => sub.key === path)
        );
        if (parentItem) {
          setOpenKeys([parentItem.key]);
        }
      }
    }
  }, [path]);

  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  const theme = {
    "components": {
      // "Menu": {
      //   "itemHoverBg": "rgb(250,140,22)",
      //   "itemSelectedBg": "rgb(250,219,20)"
      // }
    }
  }

  return (
    <div className="overflow-y-scroll bg-white px-3">
      <div className="px-1">
        <Link
          to={"/"}
          className="mb-1 flex items-center flex-col gap-2 justify-center py-4"
        >
          <img src={DeliveryLogo} alt="Company Logo" className=" border-b-2 " />
        </Link>
      </div>
      <ConfigProvider theme={theme}>
        <Menu
          mode="inline"
          selectable={true}
          selectedKeys={[selectedKey]}
          openKeys={openKeys}
          onOpenChange={handleOpenChange}
          style={{ borderRightColor: "transparent", background: "#FFFFFF" }}
          items={menuItems}
        />
      </ConfigProvider>
    </div>
  );
};

export default Sidebar;
