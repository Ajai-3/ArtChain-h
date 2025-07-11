import React, { useState } from "react";
import LikedItems from "../../admin/components/settings/LikedItems";
import { useLogoutMutation } from "../../../api/user/auth/mutations";
import SalesHistory from "../../admin/components/settings/SalesHistory";
import BlockedUsers from "../../admin/components/settings/BlockedUsers";
import HelpAndSupport from "../../admin/components/settings/HelpAndSupport";
import UserSettingsSideBar from "../components/sidebar/UserSettingsSideBar";
import ProfileSettings from "../../admin/components/settings/ProfileSettings";
import PrivacySettings from "../../admin/components/settings/PrivacySettings";
import PurchaseHistory from "../../admin/components/settings/PurchaseHistory";
import ConfirmLogoutModal from "../../../components/modals/ConfirmLogoutModal";
import PasswordSettings from "../../admin/components/settings/PasswordSettings";
import NotificationSettings from "../../admin/components/settings/NotificationSettings";
import SubscriptionSettings from "../../admin/components/settings/SubscriptionSettings";
import EmailPreferencesSettings from "../../admin/components/settings/EmailPreferencesSettings";

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const logoutMutation = useLogoutMutation();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="flex">
      <UserSettingsSideBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogoutClick={() => setShowLogoutModal(true)}
      />

      <div className="p-4 w-full h-[calc(100vh-62px)] scrollbar overflow-y-auto">
        {activeTab === "profile" && <ProfileSettings />}
        {activeTab === "password" && <PasswordSettings />}
        {activeTab === "privacy" && <PrivacySettings />}
        {activeTab === "notifications" && <NotificationSettings />}
        {activeTab === "subscriptions" && <SubscriptionSettings />}
        {activeTab === "purchases" && <PurchaseHistory />}
        {activeTab === "sales" && <SalesHistory />}
        {activeTab === "liked" && <LikedItems />}
        {activeTab === "blocked" && <BlockedUsers />}
        {activeTab === "support" && <HelpAndSupport />}
        {activeTab === "communications" && <EmailPreferencesSettings />}
      </div>

      <ConfirmLogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default Settings;
