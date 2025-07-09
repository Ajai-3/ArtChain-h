import AdminLayout from "../layouts/AdminLayout";
import { Route, Navigate } from "react-router-dom";
import Dashboard from "../features/admin/pages/Dashboard";
import { Login } from "../features/admin/components/auth/Login";
import UserManagement from "../features/admin/pages/UserMangement";

const AdminRoutes = [
  <Route path="/admin/login" element={<Login />} />,
  
  <Route path="/admin" element={<AdminLayout />}>
    {/* Auto-redirect from /admin to /admin/dashboard */}
    <Route index element={<Navigate to="dashboard" replace />} />
    
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="user-management" element={<UserManagement />} />
    {/* Other admin routes... */}
  </Route>,
];

export default AdminRoutes;