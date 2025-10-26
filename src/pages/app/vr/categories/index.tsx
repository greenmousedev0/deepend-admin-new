import type { ApiResponse } from "@/api/apiClient";
import apiClient from "@/api/apiClient";
import QueryPageLayout from "@/components/layout/QueryPageLayout";
import SimplePaginator from "@/components/SimplePaginator";
import { usePagination } from "@/store/pagination";
import { useQuery } from "@tanstack/react-query";

export default function index() {
  const props = usePagination();
  const query = useQuery<ApiResponse>({
    queryKey: ["vr-categories", props.page],
    queryFn: async () => {
      let resp = await apiClient.get("admins/vrgames/categories", {
        params: { page: props.page, limit: 20 },
      });
      return resp.data;
    },
  });
  return (
    <QueryPageLayout query={query} title={"VR Categories"}>
      <ul className="space-y-4">
        {query.data?.payload.map((item, index) => {
          return (
            <li
              className="space-y-2 bg-base-100 p-4 rounded-md shadow"
              key={index}
            >
              <h2 className="text-lg capitalize">
                {index + 1}. {item.name}
              </h2>
              <p className="fieldset-label">{item.description}</p>
            </li>
          );
        })}
      </ul>
      <div className="mt-4">
        <SimplePaginator {...props} />
      </div>
    </QueryPageLayout>
  );
}
