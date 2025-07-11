import React, { useState } from 'react';
import UserSettingsSideBar from '../components/sidebar/UserSettingsSideBar';
import ProfileSettings from '../../admin/components/settings/ProfileSettings';
import PasswordSettings from '../../admin/components/settings/PasswordSettings';
import PrivacySettings from '../../admin/components/settings/PrivacySettings';
import NotificationSettings from '../../admin/components/settings/NotificationSettings';
import SubscriptionSettings from '../../admin/components/settings/SubscriptionSettings';
import PurchaseHistory from '../../admin/components/settings/PurchaseHistory';
import SalesHistory from '../../admin/components/settings/SalesHistory';
import LikedItems from '../../admin/components/settings/LikedItems';
import BlockedUsers from '../../admin/components/settings/BlockedUsers';
import HelpAndSupport from '../../admin/components/settings/HelpAndSupport';
import EmailPreferencesSettings from '../../admin/components/settings/EmailPreferencesSettings';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  return (
    <div className='flex'>
      <UserSettingsSideBar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="p-4 w-full h-[calc(100vh-62px)] scrollbar overflow-y-auto">
        {activeTab === 'profile' && <ProfileSettings />}
        {activeTab === 'password' && <PasswordSettings />}
        {activeTab === 'privacy' && <PrivacySettings />}
        {activeTab === 'notifications' && <NotificationSettings />}
        {activeTab === 'subscriptions' && <SubscriptionSettings />}
        {activeTab === 'purchases' && <PurchaseHistory />}
        {activeTab === 'sales' && <SalesHistory />}
        {activeTab === 'liked' && <LikedItems />}
        {activeTab === 'blocked' && <BlockedUsers />}
        {activeTab === 'support' && <HelpAndSupport />}
        {activeTab === 'communications' && <EmailPreferencesSettings />}
      </div>
    </div>
  );
};

export default Settings;