import apiClient from "@/api/apiClient";
import QueryCompLayout from "@/components/layout/QueryCompLayout";
import { useQuery } from "@tanstack/react-query";

export default function GamePurchases({ gameId }: { gameId: string }) {
  const query = useQuery({
    queryKey: ["game-purhases", gameId],
    queryFn: async () => {
      let resp = await apiClient.get(
        "admin/vrgames/purchases?page=1&limit=10&status=completed",
      );
      return resp.data;
    },
    enabled: !!gameId,
  });
  return (
    <QueryCompLayout query={query}>
      <h2>Purchases</h2>
      <div className=""></div>
    </QueryCompLayout>
  );
}
