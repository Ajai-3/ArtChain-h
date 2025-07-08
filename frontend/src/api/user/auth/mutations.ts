import apiClient from "../../axios";
import { useMutation } from "@tanstack/react-query";

// Mutation for logging in a user
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (credentials: { identifier: string; password: string }) =>
      apiClient.post("/api/v1/users/login", credentials),
    onSuccess: (data) => {
      // Handle successful login
      console.log("Login successful:", data);
      // Typically you would:
      // 1. Store the auth token
      // 2. Redirect the user
    },
    onError: (error: any) => {

      console.error("Login failed:", error);
    },
  });
};

// Mutation for signing up a new user
export const useSignupMutation = () => {
  return useMutation({
    mutationFn: (credentials: {
      name: string;
      username: string;
      email: string;
    }) => apiClient.post("/api/v1/users/start-register", credentials),
    onSuccess: (data) => {
      // Handle successful signup
      console.log("Verification email sended:", data);
      // Typically you would:
      // 1. Display a success message
      // 2. Redirect the user to the login page
    },
    onError: (error) => {
      // Handle errors
      console.error("Signup failed:", error);
    },
  });
};

export const useSignupverificationMutation = () => {
  return useMutation({
    mutationFn: (credentials: { token: string; password: string }) =>
      apiClient.post("/api/v1/users/register", credentials),
    onSuccess: (data) => {
      // Handle successful verification
      console.log("Email verified:", data);
      // Typically you would:
      // 1. Redirect the user to the login page
    },
    onError: (error) => {
      // Handle errors
      console.error("Verification failed:", error);
    },
  });
};

export const useForgottPasswordMutation = () => {
  return useMutation({
    mutationFn: (credentials: { identifier: string }) =>
      apiClient.post("/api/v1/users/forgot-password", credentials),
    onSuccess: (data) => {
      // Handle successful password reset request
      console.log("Password reset request sent:", data);
      // Typically you would:
      // 1. Display a success message
    },
    onError: (error) => {
      // Handle errors
      console.error("Password reset failed:", error);
    },
  });
};

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: (credentials: { token: string; password: string }) =>
      apiClient.patch("/api/v1/users/reset-password", credentials),
    onSuccess: (data) => {
      // Handle successful password reset
      console.log("Password reset successful:", data);
      // Typically you would:
      // 1. Redirect the user to the login page
    },
    onError: (error) => {
      // Handle errors
      console.error("Password reset failed:", error);
    },
  });
};

export const changePasswordMutation = () => {
  return useMutation({
    mutationFn: (credentials: {
      currentPassword: string;
      newPassword: string;
    }) => apiClient.patch("/api/v1/users/change-password", credentials),
    onSuccess: (data) => {
      // Handle successful password change
      console.log("Password changed successful:", data);
      // Typically you would:
      // 1. Display a success message
    },
    onError: (error) => {
      // Handle errors
      console.error("Password change failed:", error);
    },
  });
};
