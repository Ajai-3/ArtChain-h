import { Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../features/admin/pages/Dashboard";
import { Login } from "../features/admin/components/auth/Login";
import UserMangement from "../features/admin/pages/UserMangement";

const AdminRoutes = [
  <Route path="/admin/login" element={<Login />} />,

  <Route path="/admin/dashboard" element={<AdminLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="user-management" element={<UserMangement />} />
  </Route>,
];

export default AdminRoutes;
