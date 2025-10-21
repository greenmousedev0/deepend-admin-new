import { get_user_value } from "@/store/authStore";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://deepend-api.onrender.com/api/v1/",
});

apiClient.interceptors.request.use((config) => {
  const user = get_user_value();
  const token = user?.access_token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface ApiResponse<T = any> {
  message: string;
  payload: T;
  status: string;
  statusCode: number;
}

export default apiClient;
