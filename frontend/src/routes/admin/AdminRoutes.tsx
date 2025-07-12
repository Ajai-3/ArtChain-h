import { Route, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import AdminLayout from '../../layouts/AdminLayout';

const Login = lazy(() => import('../../features/admin/components/auth/Login'));
const Dashboard = lazy(() => import('../../features/admin/pages/Dashboard'));
const UserManagement = lazy(() => import('../../features/admin/pages/UserMangement'));

const AdminRoutes = (
  <>
    <Route path="/admin/login" element={<Login />} />
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="user-management" element={<UserManagement />} />
    </Route>
  </>
);

export default AdminRoutes;