import type { ApiResponse } from "@/api/apiClient";
import type { AxiosResponse } from "axios";

export const extract_message = (data: ApiResponse) => {
  const code = data.message;
  return code;
};
