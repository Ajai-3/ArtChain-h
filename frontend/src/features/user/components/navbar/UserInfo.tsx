import React from "react";
import { Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../redux/store";
import { Button } from "../../../../components/ui/button";

const UserInfo: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const isLoggedIn = !!user;

  return (
    <div className="flex items-center gap-3">
      {isLoggedIn ? (
        <>
          {/* Notifications Button */}
          <button
            onClick={() => navigate("/notifications")}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-zinc-800 dark:text-zinc-200 hover:text-main-color" />
          </button>

          {/* Profile Button */}
          <button
            onClick={() => navigate("/profile")}
            className="p-0 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Profile"
          >
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt={`${user.name}'s profile`}
                className="w-9 h-9 rounded-full border border-zinc-300 dark:border-zinc-600 object-cover"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center text-white">
                <span className="text-lg font-medium">
                  {user?.name?.charAt(0).toUpperCase() || <User className="w-4 h-4" />}
                </span>
              </div>
            )}
          </button>

          {/* Become Creator Button */}
          <Button
            variant="main"
            className="hidden sm:flex bg-main-color hover:bg-main-color/90 text-white dark:text-white h-9 px-3 rounded-md text-sm font-medium"
            onClick={() => navigate("/become-creator")}
          >
            Become Creator
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="transparant"
            className="text-zinc-800 dark:text-zinc-200 hover:text-main-color h-9 px-3 rounded-md text-sm font-medium"
            onClick={() => navigate("/login")}
          >
            Log in
          </Button>
          <Button
            variant="main"
            className="bg-main-color hover:bg-main-color/90 text-white dark:text-white h-9 px-3 rounded-md text-sm font-medium"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </Button>
        </>
      )}
    </div>
  );
};

export default UserInfo;