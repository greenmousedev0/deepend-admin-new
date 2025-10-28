import apiClient from "@/api/apiClient";
import QueryPageLayout from "@/components/layout/QueryPageLayout";
import { useQuery } from "@tanstack/react-query";
import type { Vrgame } from "@/api/types";
import { Link } from "@tanstack/react-router";
import { usePagination } from "@/store/pagination";
import SimplePaginator from "@/components/SimplePaginator";
import VRGameCard from "../_components/VRGameCard";

export default function index() {
  const props = usePagination();
  const query = useQuery<{ payload: Vrgame[] }>({
    queryKey: ["vr", props.page],
    queryFn: async () => {
      let resp = await apiClient.get("admins/vrgames", {
        params: { page: props.page },
      });
      return resp.data;
    },
  });
  return (
    <QueryPageLayout
      query={query}
      title={"VR Games"}
      headerActions={
        <>
          <Link to="new" className="btn btn-primary">
            Add New Game
          </Link>
        </>
      }
    >
      <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-2">
        {query.data?.payload.map((game) => (
          <VRGameCard game={game} key={game.id} refetch={query.refetch} />
        ))}
      </div>
      <div className="mt-4">
        <SimplePaginator {...props} />
      </div>
    </QueryPageLayout>
  );
}
