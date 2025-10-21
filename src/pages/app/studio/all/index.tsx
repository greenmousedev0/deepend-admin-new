import apiClient, { type ApiResponse } from "@/api/apiClient";
import type { Studio } from "@/api/types";
import SimpleHeader from "@/components/SimpleHeader";
import SimpleLoader from "@/components/SimpleLoader";
import SimplePaginator from "@/components/SimplePaginator";
import { usePagination } from "@/store/pagination";
import { useQuery } from "@tanstack/react-query";

export default function index() {
  const props = usePagination();
  const query = useQuery<ApiResponse<Studio[]>>({
    queryKey: ["all-studios", props.page],
    queryFn: async () => {
      let resp = await apiClient.get("admins/studios", {
        params: {
          page: props.page,
          limit: 10,
        },
      });
      return resp.data;
    },
  });
  if (query.isLoading) {
    return (
      <>
        <SimpleHeader title={"All Studios"} />
        <SimpleLoader />
      </>
    );
  }
  const items = query.data?.payload;
  return (
    <>
      <SimpleHeader title={"All Studios"} />
      <div className="">
        <ul className="space-y-4">
          {items?.map((studio) => (
            <li key={studio.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl font-bold">{studio.name}</h2>
                <p className="text-base-content/80">
                  Location: {studio.location}
                </p>
                <p className="text-lg font-semibold">
                  Hourly Rate: ${studio.hourlyRate}
                </p>
                <div className="card-actions justify-end">
                  <div
                    className={`badge ${
                      studio.isAvailable ? "badge-success" : "badge-error"
                    } text-white`}
                  >
                    {studio.isAvailable ? "Available" : "Not Available"}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <SimplePaginator {...props} />
        </div>
      </div>
    </>
  );
}
