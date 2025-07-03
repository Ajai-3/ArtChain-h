import React from "react";
import UserSideBar from "../features/user/components/sidebar/UserSideBar";
import Navbar from "../features/user/components/navbar/Navbar";
import { Outlet } from "react-router-dom";

const UserLayout: React.FC = () => {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex">
        <UserSideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
