import apiClient, { type ApiResponse } from "@/api/apiClient";
import type { FoodProps } from "@/api/types";
import SimpleHeader from "@/components/SimpleHeader";
import SimpleLoader from "@/components/SimpleLoader";
import { useQuery } from "@tanstack/react-query";
import FoodCard from "./_components/FoodCard";
import { Link } from "@tanstack/react-router";
import SimplePaginator from "@/components/SimplePaginator";
import { usePagination } from "@/store/pagination";

export default function index() {
  const props = usePagination();
  const query = useQuery<ApiResponse<FoodProps[]>>({
    queryKey: ["food", props.page],
    queryFn: async () => {
      let resp = await apiClient.get("admins/foods", {
        params: {
          page: props.page,
          limit: 10,
        },
      });
      return resp.data;
    },
  });
  if (query.isLoading) {
    return <SimpleLoader />;
  }
  const items = query.data?.payload;
  return (
    <div>
      <div>
        <SimpleHeader title={"Food (Orders)"}>
          <div>
            <Link to="/app/food/new" className="btn btn-primary">
              Add New Food
            </Link>
          </div>
        </SimpleHeader>
      </div>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items?.map((item) => {
          return <FoodCard item={item} key={item.id} />;
        })}
      </div>
      <SimplePaginator {...props} />
    </div>
  );
}
