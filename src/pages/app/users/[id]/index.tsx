import apiClient from "@/api/apiClient";
import QueryPageLayout from "@/components/layout/QueryPageLayout";
import { useQuery } from "@tanstack/react-query";

export default function index() {
  const query = useQuery({
    queryKey: ["user-details"],
    queryFn: async () => {
      let resp = await apiClient.get("admins/users/get-user/bjpyx6cgvrcvs8v");
      return resp.data;
    },
  });
  return (
    <QueryPageLayout query={query} title={"User Details"}>
      {JSON.stringify(query.data)}
    </QueryPageLayout>
  );
}
