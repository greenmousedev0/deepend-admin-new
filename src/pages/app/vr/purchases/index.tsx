import apiClient, { type ApiResponse } from "@/api/apiClient";
import QueryPageLayout from "@/components/layout/QueryPageLayout";
import { usePagination } from "@/store/pagination";
import { useQuery } from "@tanstack/react-query";

export default function index() {
  const props = usePagination();
  const query = useQuery<ApiResponse>({
    queryKey: ["vr"],
    queryFn: async () => {
      let resp = await apiClient.get("admins/vrgames/purchases", {
        params: {
          page: props.page,
          limit: 20,
        },
      });
      return resp.data;
    },
  });
  return (
    <QueryPageLayout query={query} title={"VR Game Purchases"}>
      {JSON.stringify(query.data.payload)}
    </QueryPageLayout>
  );
}
