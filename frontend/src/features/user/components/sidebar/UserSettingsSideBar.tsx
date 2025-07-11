import {
  User,
  Lock,
  Bell,
  CreditCard,
  Heart,
  Ban,
  Shield,
  ShoppingBag,
  FileText,
  Mail,
  HelpCircle,
} from "lucide-react";
import { useState } from "react";

const userSettingsTabs = [
  { id: "profile", icon: User, label: "Edit Profile" },
  { id: "password", icon: Lock, label: "Password & Security" },
  { id: "privacy", icon: Shield, label: "Privacy Settings" },
  { id: "notifications", icon: Bell, label: "Notifications" },
  { id: "subscriptions", icon: CreditCard, label: "Subscriptions" },
  { id: "purchases", icon: ShoppingBag, label: "Purchase History" },
  { id: "sales", icon: FileText, label: "Sales History" },
  { id: "liked", icon: Heart, label: "Liked Items" },
  { id: "blocked", icon: Ban, label: "Blocked Users" },
  { id: "support", icon: HelpCircle, label: "Help & Support" },
  { id: "communications", icon: Mail, label: "Email Preferences" },
];

const UserSettingsSideBar: React.FC<{
  activeTab: string;
  setActiveTab: (tab: string) => void;
}> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-r text-sm border-zinc-200 dark:border-zinc-800 p-2 h-[calc(100vh-62px)] w-64 flex flex-col bg-transparent flex-shrink-0">
      <div className="mb-4 p-2 text-2xl font-semibold">
        <h1>Settings</h1>
      </div>

      <div className="flex flex-col gap-1">
        {userSettingsTabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`p-3 rounded-md flex items-center gap-3 transition-colors ${
              activeTab === id
                ? "bg-zinc-600/30 text-white"
                : "text-zinc-700 dark:text-zinc-400 hover:bg-zinc-900 dark:hover:bg-zinc-600/30 dark:hover:text-white hover:text-white"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserSettingsSideBar;
