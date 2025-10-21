import apiClient, { type ApiResponse } from "@/api/apiClient";
import type { FoodCategory } from "@/api/types";
import SimpleHeader from "@/components/SimpleHeader";
import SimpleLoader from "@/components/SimpleLoader";
import { useQuery } from "@tanstack/react-query";
import FoodCategoryCard from "../_components/FoodCategoryCard";
import { Link } from "@tanstack/react-router";
import { usePagination } from "@/store/pagination";
import SimplePaginator from "@/components/SimplePaginator";

export default function index() {
  const props = usePagination();
  const query = useQuery<ApiResponse<FoodCategory[]>>({
    queryKey: ["food-categories", props.page],
    queryFn: async () => {
      let resp = await apiClient.get("admins/foods/categories", {
        params: {
          page: props.page,
          limit: 20,
        },
      });
      return resp.data;
    },
  });

  if (query.isLoading) {
    return <SimpleLoader></SimpleLoader>;
  }
  const items = query.data?.payload;
  return (
    <div>
      <SimpleHeader title={"Food Category"}>
        <div>
          <Link to="/app/food/category/new" className="btn btn-primary">
            Add Food Category
          </Link>
        </div>
      </SimpleHeader>
      <div className="p-4">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {items?.map((category) => (
            <FoodCategoryCard
              refetch={query.refetch}
              key={category.id}
              category={category}
            />
          ))}
        </div>
        <div className="mt-4">
          <SimplePaginator {...props}></SimplePaginator>
        </div>
      </div>
    </div>
  );
}
