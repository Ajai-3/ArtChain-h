import apiClient from "../../axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logout, setUser } from "../../../redux/slices/userSlice";

// Mutation for logging in a user
export const useLoginMutation = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (credentials: { identifier: string; password: string }) =>
      apiClient.post("/api/v1/users/login", credentials),
    onSuccess: (data: any) => {
      console.log("data", data)

        const { user, accessToken } = data;
      
      dispatch(setUser({
        user,
        accessToken
      }));

      navigate('/');
    },
    onError: (error: any) => {

      console.error("Login failed:", error);
    },
  });
};

// Mutation for logging with google
export const useGoogleLoginMutation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (credentials: { token: string, email: string, name: string }) =>
      apiClient.post("/api/v1/users/google-login", credentials),
    onSuccess: (data: any) => {
        const { user, accessToken } = data;
      
      dispatch(setUser({
        user,
        accessToken
      }));

      navigate('/');
    },
    onError: (error: any) => {

      console.error("Login failed:", error);
    },
  });
}

// Mutation for signing up a new user
export const useSignupMutation = () => {
  return useMutation({
    mutationFn: (credentials: {
      name: string;
      username: string;
      email: string;
    }) => apiClient.post("/api/v1/users/start-register", credentials),
    onSuccess: (data) => {
      console.log("Verification email sended:", data);
    },
    onError: (error) => {
      console.error("Signup failed:", error);
    },
  });
};

// Mutation for verifying a new user
export const useSignupverificationMutation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (credentials: { token: string; password: string }) =>
      apiClient.post("/api/v1/users/register", credentials),
    onSuccess: (data: any) => {
        const { user, accessToken } = data;
      
      dispatch(setUser({
        user,
        accessToken
      }));

      navigate('/');
    },
    onError: (error) => {
      console.error("Verification failed:", error);
    },
  });
};

// Mutation for requesting password reset
export const useForgottPasswordMutation = () => {
  return useMutation({
    mutationFn: (credentials: { identifier: string }) =>
      apiClient.post("/api/v1/users/forgot-password", credentials),
    onSuccess: (data) => {
      console.log("Password reset request sent:", data);
    },
    onError: (error) => {
      console.error("Password reset failed:", error);
    },
  });
};

// Mutation for resetting password
export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: (credentials: { token: string; password: string }) =>
      apiClient.patch("/api/v1/users/reset-password", credentials),
    onSuccess: (data) => {
      console.log("Password reset successful:", data);
    },
    onError: (error) => {
      console.error("Password reset failed:", error);
    },
  });
};

// Mutation for changing password
export const changePasswordMutation = () => {
  return useMutation({
    mutationFn: (credentials: {
      currentPassword: string;
      newPassword: string;
    }) => apiClient.patch("/api/v1/users/change-password", credentials),
    onSuccess: (data) => {
      console.log("Password changed successful:", data);
    },
    onError: (error) => {
      console.error("Password change failed:", error);
    },
  });
};

// Mutation for logging out a user
export const useLogoutMutation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => apiClient.post("/api/v1/users/logout"),
    onSuccess: () => {
      dispatch(logout());
      navigate('/login');
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
};
