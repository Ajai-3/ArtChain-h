import React from "react";
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../../../components/ui/button";

const UserInfo: React.FC = () => {
  const user = {
    name: "John Doe",
    profileImage: "https://i.pravatar.cc/40?img=10",
  };

  const isLoggedIn = !!user;

  return (
    <div>
      {isLoggedIn ? (
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Link to="/notifications">
            <Bell className="w-5 h-5 text-zinc-800 dark:text-zinc-200 hover:text-main-color" />
          </Link>

          {/* Profile Image */}
          <Link to="/profile">
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-10 h-10 rounded-full border border-zinc-300 dark:border-zinc-600 object-cover"
            />
          </Link>

          {/*Become a Creator Button */}
          <Link to="/become-creater">
            <Button variant="main" className="bg-main-color dark:text-white py-1 px-2 rounded-md hover:bg-main-color/80">
              Become a Creator
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link to="/login">
            <Button variant="transparant" className="bg-transparent dark:text-white py-1 px-2 rounded-md hover:text-green-300">
              Log in
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="main" className="bg-main-color dark:text-white py-1 px-2 rounded-md hover:bg-main-color/80">
              Sign up
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
