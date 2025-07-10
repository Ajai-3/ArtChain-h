import apiClient from "../../axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginSuccess, adminLogout } from "../../../redux/slices/adminSlice";


export const useAdminLoginMutation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (credentials: { identifier: string; password: string }) => 
      apiClient.post("/api/v1/admin/login", credentials),
    onSuccess: (data) => {

      console.log("Login successful:", data);
      dispatch(loginSuccess(data));

      navigate('/admin/dashboard');

    },
    onError: (error: any) => {
      const errorMessage =
        error.error?.message || error.message || "Login failed";

      console.error("Login failed:", {
        status: error.status,
        message: errorMessage,
        fullError: error,
      });
    },
  });
};


export const useAdminLogoutMutation = () => {
const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => apiClient.post("/api/v1/admin/logout"),
    onSuccess: () => {
      dispatch(adminLogout());
      navigate('/admin-login');
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      // Still clear auth state even if API fails
      dispatch(adminLogout());
      navigate('/admin-login');
    }
  });
};