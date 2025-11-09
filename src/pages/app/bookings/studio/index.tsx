import apiClient, { type ApiResponse } from "@/api/apiClient";
import SuspensePageLayout from "@/components/layout/SuspensePageLayout";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
type selectedType = "ongoing" | "completed" | "cancelled";
export default function index() {
  const [selected, setSelected] = useState<selectedType>("ongoing");
  const query = useSuspenseQuery<ApiResponse<any>>({
    queryKey: ["studio-bookings", selected],
    queryFn: async () => {
      let resp = await apiClient.get("admins/equipments/bookings", {
        params: {
          status: selected,
        },
      });
      return resp.data;
    },
  });
  return (
    <SuspensePageLayout query={query}>
      <div>{JSON.stringify(query.data)}</div>
    </SuspensePageLayout>
  );
}
