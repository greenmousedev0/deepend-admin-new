import apiClient, { type ApiResponse } from "@/api/apiClient";
import type { RentalEquipment } from "@/api/types";
import QueryPageLayout from "@/components/layout/QueryPageLayout";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import EditFormRental from "../../_components/EditForm";

export default function index() {
  const { id } = useParams({
    strict: false,
  });
  const query = useQuery<ApiResponse<RentalEquipment>>({
    queryKey: ["rental-equipment-details", id],
    queryFn: async () => {
      const resp = await apiClient.get("admins/equipments/" + id);
      return resp.data;
    },
  });
  return (
    <QueryPageLayout query={query} title={"Edit Rental Equipment Details"}>
      <EditFormRental item={query.data?.payload} />
    </QueryPageLayout>
  );
}
