import apiClient, { type ApiResponse } from "@/api/apiClient";
import type { User } from "@/api/types";
import QueryPageLayout from "@/components/layout/QueryPageLayout";
import SimpleHeader from "@/components/SimpleHeader";
import { useQuery } from "@tanstack/react-query";
import UserCard from "./_components/UserCard";
import SimplePaginator from "@/components/SimplePaginator";
import { usePagination } from "@/store/pagination";

export default function index() {
  const props = usePagination();
  const query = useQuery<ApiResponse<User[]>>({
    queryKey: ["users", props.page],
    queryFn: async () => {
      const response = await apiClient.get("admins/users", {
        params: {
          page: props.page,
          limit: 10,
        },
      });
      return response.data;
    },
  });
  const items = query.data?.payload;
  return (
    <QueryPageLayout
      query={query}
      title={
        <span>
          Users <span className="label">({items?.length || 0})</span>
        </span>
      }
    >
      <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-2">
        {items?.map((user) => {
          return <UserCard key={user.id} user={user} />;
        })}
      </div>
      <div className="mt-4">
        <SimplePaginator {...props} />
      </div>
    </QueryPageLayout>
  );
}
