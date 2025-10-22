import apiClient, { type ApiResponse } from "@/api/apiClient";
import type { Hotel } from "@/api/types";
import SimpleHeader from "@/components/SimpleHeader";
import SimpleLoader from "@/components/SimpleLoader";
import SimplePaginator from "@/components/SimplePaginator";
import { usePagination } from "@/store/pagination";
import { useQuery } from "@tanstack/react-query";
import HotelCard from "./_components/HotelCard";

export default function index() {
  const props = usePagination();
  const query = useQuery<ApiResponse<Hotel[]>>({
    queryKey: ["hotels", props.page],
    queryFn: async () => {
      let resp = await apiClient.get("admins/hotels", {
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
        <SimpleHeader title={"Hotels"} />
        <SimpleLoader />
      </>
    );
  }
  const items = query.data?.payload || [];
  return (
    <>
      <SimpleHeader title={"Hotels"} />
      <div className="container mx-auto ">
        <div className="space-y-4">
          {items?.map((hotel) => (
            <HotelCard hotel={hotel} key={hotel.id} />
          ))}
        </div>
      </div>
      <div className="mt-4">
        <SimplePaginator {...props} />
      </div>
    </>
  );
}
