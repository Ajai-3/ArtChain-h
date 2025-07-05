import { useQuery } from "@tanstack/react-query";
import apiClient from "../axios";


// User Profile
export const useUserProfile = () => {
    useQuery({
        queryKey: ['userProfile'],
        queryFn: () => apiClient.get("api/v1/user/profile"),
        retry: 2,
        refetchInterval: false,
    })
}