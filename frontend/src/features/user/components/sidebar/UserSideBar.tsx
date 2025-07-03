import {
  House,
  MessageSquareText,
  FlaskConical,
  Bell,
  Plus,
  Gavel,
  ShoppingBag,
  CreditCard,
  User,
  Settings,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/", icon: House, label: "Home" },
  { to: "/messages", icon: MessageSquareText, label: "Messages" },
  { to: "/liora", icon: FlaskConical, label: "Flask" },
  { to: "/notifications", icon: Bell, label: "Notifications" },
  { to: "/create", icon: Plus, label: "Create" },
  { to: "/bidding", icon: Gavel, label: "Bidding" },
  { to: "/shop", icon: ShoppingBag, label: "Shope" },
  { to: "/payments", icon: CreditCard, label: "Payments" },
  { to: "/profile", icon: User, label: "Profile" },
];

const UserSideBar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="border-r border-zinc-400 dark:border-zinc-800 p-2 h-[calc(100vh-64px)] w-16 flex flex-col justify-between">
      <div className="flex flex-col gap-2">
        {links.map(({ to, icon: Icon, label }) => {
        const isActive = location.pathname === to;

        return (
          <Link
            key={to}
            to={to}
            className={`p-3 rounded-md flex items-center justify-center transition-colors ${
              isActive
                ? "bg-zinc-700/30 text-white"
                : " text-zinc-800 dark:text-gray-500 hover:bg-zinc-600/30"
            }`}
            title={label}
          >
            <Icon className="w-6 h-6" />
          </Link>
        );
      })}
      </div>

      <div className="flex items-center justify-center gap-2">
        <Settings className="w-6 h-6" />
      </div>
    </div>
  );
};

export default UserSideBar;
