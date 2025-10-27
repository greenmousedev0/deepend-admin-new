import type { ApiResponse } from "@/api/apiClient";
import apiClient from "@/api/apiClient";
import type { Vrgame } from "@/api/types";
import QueryPageLayout from "@/components/layout/QueryPageLayout";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import GameEditForm from "../_components/GameEditForm";

export default function index() {
  const { gameId } = useParams({
    strict: false,
  });

  const query = useQuery<ApiResponse<Vrgame>>({
    queryKey: ["game", gameId],
    queryFn: async () => {
      const response = await apiClient.get(`admins/vrgames/${gameId}`);
      return response.data;
    },
  });
  const item = query.data?.payload;
  return (
    <QueryPageLayout query={query} title="Edit Game">
      <GameEditForm item={item} />
    </QueryPageLayout>
  );
}
