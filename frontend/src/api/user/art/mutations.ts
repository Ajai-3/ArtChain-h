import apiClient from "../../axios";
import { toast } from 'react-hot-toast';
import { useMutation } from "@tanstack/react-query";

export const useCreateArtworkMutation = () => {
  return useMutation({
    mutationFn: (payload: any) =>

      apiClient.post("/api/v1/art", payload),

    onSuccess: (data) => {
      console.log("Artwork created:", data);
      toast.success("Artwork created successfully");
    },
    onError: (error) => {
      console.error("Artwork creation failed:", error);
    },
  });
};