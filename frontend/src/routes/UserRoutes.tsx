import { Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import Home from "../features/user/pages/Home";
import Profile from "../features/user/pages/Profile";
import Auth from "../features/user/components/auth/Auth";
import ResetPassword from "../features/user/components/auth/ResetPassword";
import SignupPassword from "../features/user/components/auth/SignupPassword";

const UserRoutes = [
  <Route path="/login" element={<Auth />} key="auth" />,
  <Route path="/reset-password" element={<ResetPassword />} />,
  <Route path="/verify" element={<SignupPassword />} />,

  <Route path="/" element={<UserLayout />}>
    <Route index element={<Home />} />
    <Route path="profile" element={<Profile />} />
  </Route>,
];

export default UserRoutes;
