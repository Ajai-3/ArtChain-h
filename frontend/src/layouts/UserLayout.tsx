import React, { useState } from "react";
import UserSideBar from "../features/user/components/sidebar/UserSideBar";
import Navbar from "../features/user/components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import CreatePost from "../features/user/components/post/CreatePost";

const UserLayout: React.FC = () => {
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex">
        <UserSideBar createPostClick={() => setShowCreatePostModal(true)} />
        <Outlet />
      </div>
      <CreatePost isOpen={showCreatePostModal} onClose={() => setShowCreatePostModal(false)} onConfirm={() => {}} />
    </div>
  );
};

export default UserLayout;
