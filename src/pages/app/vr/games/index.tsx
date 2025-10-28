import apiClient from "@/api/apiClient";
import QueryPageLayout from "@/components/layout/QueryPageLayout";
import { useQuery } from "@tanstack/react-query";
import type { Vrgame } from "@/api/types";
import { Link } from "@tanstack/react-router";
import { usePagination } from "@/store/pagination";
import SimplePaginator from "@/components/SimplePaginator";

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
          <div
            key={game.id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden border border-base-200"
          >
            <figure className="relative h-56 w-full">
              <img
                src={
                  game.imageUrls[0]?.url ||
                  "https://picsum.photos/400/200?random=1"
                }
                alt={game.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3 flex flex-col gap-2">
                <div className="badge badge-lg badge-primary rounded-full px-4 py-3 text-sm font-bold shadow-lg">
                  {game.ageRating}+
                </div>
                <div
                  className={`badge badge-lg rounded-full px-4 py-3 text-sm font-bold shadow-lg ${game.isAvailable ? "badge-success" : "badge-error"}`}
                >
                  {game.isAvailable ? "Available" : "Unavailable"}
                </div>
              </div>
            </figure>
            <div className="card-body p-6">
              <h2 className="card-title text-base-content text-xl font-bold mb-2">
                {game.name}
              </h2>
              <p className="text-base-content text-sm line-clamp-3 min-h-[4rem] opacity-90">
                {game.description}
              </p>
              <div className="flex items-center justify-between mt-6">
                <div className="flex flex-wrap gap-3">
                  <div className="badge badge-secondary badge-lg rounded-full px-4 py-3 text-sm font-bold">
                    ${game.ticketPrice}
                  </div>
                  <div className="badge badge-accent badge-lg rounded-full px-4 py-3 text-sm font-bold">
                    {game.ticketQuantity} Tickets
                  </div>
                </div>
                <div className="card-actions">
                  <Link
                    to={"/app/vr/games/" + game.id}
                    className="btn btn-primary btn-md rounded-full hover:scale-105 transition-transform duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <SimplePaginator {...props} />
      </div>
    </QueryPageLayout>
  );
}
