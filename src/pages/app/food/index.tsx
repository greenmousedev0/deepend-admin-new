import apiClient, { type ApiResponse } from "@/api/apiClient";
import type { FoodProps } from "@/api/types";
import SimpleHeader from "@/components/SimpleHeader";
import SimpleLoader from "@/components/SimpleLoader";
import { useQuery } from "@tanstack/react-query";
import FoodCard from "./_components/FoodCard";

export default function index() {
  const query = useQuery<ApiResponse<FoodProps[]>>({
    queryKey: ["food"],
    queryFn: async () => {
      let resp = await apiClient.get("admins/foods?page=1&limit=10");
      return resp.data;
    },
  });
  if (query.isLoading) {
    return <SimpleLoader />;
  }
  const items = query.data?.payload;
  return (
    <div>
      <SimpleHeader title={"Food (Orders)"} />
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items?.map((item) => {
          return <FoodCard item={item} key={item.id} />;
        })}
      </div>
    </div>
  );
}
