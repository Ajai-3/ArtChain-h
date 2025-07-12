import { useState } from "react";
import { useSelector } from "react-redux";
import type { User } from "../../../types/user";
import type { RootState } from "../../../redux/store";
import ProfileTopBar from "../components/profile/ProfileTopBar";
import ProfileSelectBar from "../components/profile/ProfileSelectBar";
import ProfileContent from "../components/profile/ProfileContent";

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("gallery");
  const { user } = useSelector((state: RootState) => state.user) as {
    user: User | null;
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-62px)]">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col h-[calc(100vh-62px)]">
      {/* Scrollable Area */}
      <div className="flex-1 overflow-y-auto scrollbar relative">
        {/* Non-sticky part (ProfileTopBar) */}
        <ProfileTopBar user={user} />
        
        {/* Sticky tab bar - increased z-index */}
        <div className="sticky top-0 z-20 bg-white dark:bg-secondary-color">
          <ProfileSelectBar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        
        {/* Content area */}
        
        <ProfileContent activeTab={activeTab} user={user} />
      </div>
    </div>
  );
};

export default Profile;