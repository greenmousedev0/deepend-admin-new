import apiClient, { type ApiResponse } from "@/api/apiClient";
import type { Vrgame } from "@/api/types";
import QueryPageLayout from "@/components/layout/QueryPageLayout";
import { useQuery } from "@tanstack/react-query";

export default function index() {
  const query = useQuery<ApiResponse<Vrgame[]>>({
    queryKey: ["vr"],
    queryFn: async () => {
      let resp = await apiClient.get("admins/vrgames");
      return resp.data;
    },
  });
  return <QueryPageLayout query={query} title={"VR Games"}></QueryPageLayout>;
}
