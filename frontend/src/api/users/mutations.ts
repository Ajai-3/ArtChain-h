import apiClient from "../axios";
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
    onError: (error) => {
      // Handle errors
      console.error("Login failed:", error);
    }
  });
};