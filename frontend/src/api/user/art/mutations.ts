import apiClient from "../../axios";
import { useMutation } from "@tanstack/react-query";

// Mutation for create a new art work
export const useCreateArtworkMutation = () => {
    return useMutation({
        mutationFn: (credentials: { title: string; description: string }) =>
            apiClient.post("/api/v1/artworks", credentials),
        onSuccess: (data) => {
            console.log("Artwork created:", data);
        },
        onError: (error) => {
            console.error("Artwork creation failed:", error);
        },
    });
};