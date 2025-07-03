import { Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import Home from "../features/user/pages/Home";
import Profile from "../features/user/pages/Profile";

const UserRoutes = (
  <Route path="/" element={<UserLayout />}>
    <Route index element={<Home />} />
    <Route path="profile" element={<Profile />} />
  </Route>
);

export default UserRoutes;
