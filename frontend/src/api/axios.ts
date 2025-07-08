import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (!error.response) {
      return Promise.reject({
        message: 'Network Error',
        status: 503
      });
    }

    // Debug the raw response
    console.log('Raw error response:', {
      status: error.response.status,
      data: error.response.data
    });

    // Return the error in a consistent structure
    return Promise.reject({
      status: error.response.status,
      ...error.response.data,
      message: error.response.data?.error?.message || 'Request failed'
    });
  }
);

export default apiClient;
