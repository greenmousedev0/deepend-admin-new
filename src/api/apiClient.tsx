// import axios from "axios";
// import { get_user_value, set_user_value, clear_user } from "@/store/authStore";
// import { toast } from "sonner";

// // Create axios instance
// const apiClient = axios.create({
//   baseURL: "https://deepend-api.onrender.com/api/v1/",
//   withCredentials: true,
// });

// // Attach access token to requests
// apiClient.interceptors.request.use((config) => {
//   const user = get_user_value();
//   const token = user?.access_token;

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Refresh token logic (only runs once per 401)
// let isRefreshing = false;
// let pendingRequests: ((token: string) => void)[] = [];

// function subscribeTokenRefresh(cb: (token: string) => void) {
//   pendingRequests.push(cb);
// }

// function onTokenRefreshed(newToken: string) {
//   pendingRequests.forEach((cb) => cb(newToken));
//   pendingRequests = [];
// }

// // Handle expired tokens globally
// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If 401 and not retrying yet
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const user = get_user_value();

//       // If already refreshing, queue the request
//       if (isRefreshing) {
//         return new Promise((resolve) => {
//           subscribeTokenRefresh((token) => {
//             originalRequest.headers.Authorization = `Bearer ${token}`;
//             resolve(apiClient(originalRequest));
//           });
//         });
//       }

//       isRefreshing = true;

//       try {
//         // Attempt refresh
//         const refreshResponse = await axios.post(
//           "https://deepend-api.onrender.com/api/v1/auth/users/refresh-token",
//           { refresh_token: user?.refresh_token },
//         );

//         const newToken = refreshResponse.data?.access_token;
//         const newUser = { ...user, access_token: newToken };
//         console.log(newToken);
//         //@ts-ignore
//         set_user_value(newUser); // store new user/token in localStorage or Jotai
//         apiClient.defaults.headers.Authorization = `Bearer ${newToken}`;
//         onTokenRefreshed(newToken);
//         isRefreshing = false;

//         // Retry original request
//         originalRequest.headers.Authorization = `Bearer ${newToken}`;
//         return apiClient(originalRequest);
//       } catch (refreshError) {
//         isRefreshing = false;
//         clear_user(); // logout
//         toast.info("Session expired. Please login again.", { duration: 1000 });
//         window.location.href = "/auth/login"; // or your route
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   },
// );

export interface ApiResponse<T = any> {
  message: string;
  payload: T;
  status: string;
  statusCode: number;
}

// export default apiClient;

import axios from "axios";
import { get_user_value, set_user_value, clear_user } from "@/store/authStore";
import { toast } from "sonner";

const apiClient = axios.create({
  baseURL: "https://deepend-api.onrender.com/api/v1/",
  withCredentials: true,
});

// Attach access token before each request
apiClient.interceptors.request.use((config) => {
  const token = get_user_value()?.access_token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Single simple refresh handler
apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    // If token expired and not already retried
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const user = get_user_value();
        const { data } = await axios.post(
          "https://deepend-api.onrender.com/api/v1/auth/users/refresh-token",
          { userId: user.id },
        );
        const payload = data.payload;
        const newUser = { ...payload, access_token: payload.access_token };
        set_user_value(newUser);

        // Update header and retry
        original.headers.Authorization = `Bearer ${data.access_token}`;
        return apiClient(original);
      } catch {
        clear_user();
        toast.info("Session expired. Please log in again.", { duration: 1500 });
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
