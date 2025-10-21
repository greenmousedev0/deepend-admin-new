import apiClient, { type ApiResponse } from "@/api/apiClient";
import SimpleLoader from "@/components/SimpleLoader";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

export default function index() {
  const id = useParams({
    from: "/app/food/$id",
    select: (params) => params.id,
  });

  const query = useQuery<ApiResponse>({
    queryKey: ["food-item", id],
    queryFn: async () => {
      let resp = await apiClient.get("admins/foods/" + id);
      return resp.data;
    },
  });
  if (query.isLoading) {
    return <SimpleLoader />;
  }
  return <div>{id}</div>;
}
