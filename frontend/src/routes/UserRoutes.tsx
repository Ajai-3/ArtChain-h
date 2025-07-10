import { Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import Home from "../features/user/pages/Home";
import Profile from "../features/user/pages/Profile";
import Auth from "../features/user/components/auth/Auth";
import ResetPassword from "../features/user/components/auth/ResetPassword";
import SignupPassword from "../features/user/components/auth/SignupPassword";
import Messages from "../features/user/pages/Messages";
import Liora from "../features/user/pages/Liora";
import Notifications from "../features/user/pages/Notifications";
import Bidding from "../features/user/pages/Bidding";
import Shop from "../features/user/pages/Shop";
import Wallet from "../features/user/pages/Wallet";
import Settings from "../features/user/pages/Settings";

const UserRoutes = [
  <Route path="/login" element={<Auth />} key="auth" />,
  <Route path="/reset-password" element={<ResetPassword />} />,
  <Route path="/verify" element={<SignupPassword />} />,

  <Route path="/" element={<UserLayout />}>
    <Route index element={<Home />} />
    <Route path="messages" element={<Messages />} />
    <Route path="liora.ai" element={<Liora />} />
    <Route path="notifications" element={<Notifications />} />
    <Route path="bidding" element={<Bidding />} />
    <Route path="shop" element={<Shop />} />
    <Route path="wallet" element={<Wallet />} />
    <Route path="profile" element={<Profile />} />
    <Route path="settings" element={<Settings />} />
  </Route>,
];

export default UserRoutes;
