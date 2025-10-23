import type { ApiResponse } from "@/api/apiClient";
import apiClient from "@/api/apiClient";
import type { HotelInfo } from "@/api/types";
import SimpleHeader from "@/components/SimpleHeader";
import SimpleLoader from "@/components/SimpleLoader";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import HotelEditForm from "../../_components/EditForm";

export default function index() {
  const { id } = useParams({
    from: "/app/hotel/$id",
  });
  const query = useQuery<ApiResponse<HotelInfo>>({
    queryKey: ["hotel", id],
    queryFn: async () => {
      let resp = await apiClient.get("admins/hotels/" + id);
      return resp.data;
    },
  });

  if (query.isLoading) {
    return (
      <>
        <SimpleHeader title={"Edit"} />
        <SimpleLoader />
      </>
    );
  }
  const item = query.data.payload;
  return (
    <div>
      <SimpleHeader title={"Edit"} />
      <HotelEditForm item={item} />
    </div>
  );
}
