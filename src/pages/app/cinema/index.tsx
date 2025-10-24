import apiClient, { type ApiResponse } from "@/api/apiClient";
import type { Cinema } from "@/api/types";
import SimpleHeader from "@/components/SimpleHeader";
import SimpleLoader from "@/components/SimpleLoader";
import { usePagination } from "@/store/pagination";
import { useQuery } from "@tanstack/react-query";

export default function index() {
  const props = usePagination();
  const query = useQuery<ApiResponse<Cinema[]>>({
    queryKey: ["cinemas", props.page],
    queryFn: async () =>
      (
        await apiClient.get("admins/cinemas", {
          params: {
            page: props.page,
            limit: 10,
          },
        })
      ).data,
  });
  if (query.isLoading)
    return (
      <>
        <SimpleHeader title={"cinema"} />
        <SimpleLoader />
      </>
    );
  const items = query.data.payload;
  return (
    <>
      <SimpleHeader title={"Cinema"} />
      <div className="flex flex-col gap-2 ">
        {items.map((item) => (
          <div
            key={item.id}
            className="card card-compact bg-base-100 shadow-xl"
          >
            <div className="card-body">
              <h2 className="card-title">{item.name}</h2>
              <p>
                {item.address}, {item.city}, {item.state}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
