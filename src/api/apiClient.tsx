import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://deepend-api.onrender.com/api/v1/",
});

export interface ApiResponse<T = any> {
  message: string;
  payload: T;
  status: string;
  statusCode: number;
}

export default apiClient;
