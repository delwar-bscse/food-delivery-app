import { ConfigProvider, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { LuLayoutDashboard } from "react-icons/lu";
import Cookies from "js-cookie";
import { LuUser } from "react-icons/lu";
import { RiFileList2Line } from "react-icons/ri";
import { RiDiscountPercentLine } from "react-icons/ri";
import { LuClipboardList } from "react-icons/lu";
import { TbUserCircle } from "react-icons/tb";
import { AiOutlineSound } from "react-icons/ai";
import { RiLineChartLine } from "react-icons/ri";
import { CgShoppingBag } from "react-icons/cg";

import { DeliveryLogo } from "../../assets/assets";
import { LogOut } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const [selectedKey, setSelectedKey] = useState("");
  const [openKeys, setOpenKeys] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("ivan_authToken");
    Cookies.remove("ivan_refreshToken");
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
      key: "/orders",
      icon: <CgShoppingBag size={24} />,
      label: <Link to="/orders">Parcel Management</Link>,
    },
    // {
    //   key: "/view-reports",
    //   icon: <RiFileList2Line size={24} />,
    //   label: <Link to="/view-reports">Reports</Link>,
    // },
    {
      key: "/analytics",
      icon: <RiLineChartLine size={24} />,
      label: <Link to="/analytics">Analytics</Link>,
    },
    {
      key: "/subscriptions",
      icon: <RiDiscountPercentLine size={24} />,
      label: <Link to="/subscriptions">Subscriptions</Link>,
    },
    {
      key: "/announcements",
      icon: <AiOutlineSound size={24} />,
      label: <Link to="/announcements">Announcements</Link>,
    },
    // {
    //   key: "/terms-and-conditions",
    //   icon: <LuClipboardList size={24} />,
    //   label: <Link to="/terms-and-conditions">Terms & Conditions</Link>,
    // },
    {
      key: "/profile",
      icon: <TbUserCircle size={24} />,
      label: <Link to="/profile">Edit Profile</Link>,
    },
    {
      key: "/auth/login",
      icon: <LogOut size={24} />,
      label: <button onClick={handleLogout}>Logout</button>,
    },
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
