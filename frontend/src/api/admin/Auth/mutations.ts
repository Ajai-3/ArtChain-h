import apiClient from "../../axios";
import { useMutation } from "@tanstack/react-query";

export const useAdminLoginMutation = () => {
  return useMutation({
    mutationFn: (credentials: { identifier: string; password: string }) => 
      apiClient.post("/api/v1/admin/login", credentials),
    onSuccess: (data) => {
      // Handle successful login
      console.log("Login successful:", data);
      // Typically you would:
      // 1. Store the auth token
      // 2. Redirect the user
    },
    onError: (error: any) => {
      // Get the most specific error message available
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