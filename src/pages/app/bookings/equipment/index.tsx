import apiClient, { type ApiResponse } from "@/api/apiClient";
import QueryPageLayout from "@/components/layout/QueryPageLayout";
import SuspensePageLayout from "@/components/layout/SuspensePageLayout";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
type selectedType = "ongoing" | "completed" | "cancelled";
export default function index() {
  const [selected, setSelected] = useState<selectedType>("completed");
  const query = useQuery<ApiResponse<any>>({
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
      {(data) => {
        return <>{JSON.stringify(data)}</>;
      }}
    </SuspensePageLayout>
  );
}

const Content = () => {};
