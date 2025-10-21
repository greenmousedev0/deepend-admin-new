import apiClient, { type ApiResponse } from "@/api/apiClient";
import SimpleLoader from "@/components/SimpleLoader";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

export default function index() {
  const { categoryId } = useParams({
    from: "/app/food/addons/item/$categoryId",
    select: ({ categoryId }) => ({
      categoryId,
    }),
  });

  const query = useQuery<ApiResponse>({
    queryKey: ["addon-items", categoryId],
    queryFn: async () => {
      let resp = await apiClient.get(
        "admins/foods/addons/categories/" + categoryId,
        {
          params: {
            page: 1,
            limit: 10,
          },
        },
      );
      return resp.data;
    },
  });

  if (query.isLoading) <SimpleLoader />;
  return (
    <div>
      {categoryId} {JSON.stringify(query.data)}
    </div>
  );
}
