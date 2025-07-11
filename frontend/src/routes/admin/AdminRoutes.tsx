import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import PageFallback from "../../components/PageFallback";

// Layout
import AdminLayout from "../../layouts/AdminLayout";

// Lazy-loaded pages
const Login = lazy(() => import("../../features/admin/components/auth/Login"));
const Dashboard = lazy(() => import("../../features/admin/pages/Dashboard"));
const UserManagement = lazy(() => import("../../features/admin/pages/UserMangement"));

const AdminRoutes = () => {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="user-management" element={<UserManagement />} />
          {/* Add more nested routes if needed */}
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;
