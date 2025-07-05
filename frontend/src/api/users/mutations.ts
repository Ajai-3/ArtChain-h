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

// Mutation for signing up a new user
export const useSignupMutation = () => {
  return useMutation({
    mutationFn: (credentials: { name: string; username: string, email: string; }) =>
      apiClient.post("/api/v1/users/start-register", credentials),
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
    }
  });
};