import type { ApiResponse } from "@/api/apiClient";
import apiClient from "@/api/apiClient";
import type { User } from "@/api/types";
import { useQuery } from "@tanstack/react-query";

export default function DashUserLists() {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery<ApiResponse<User[]>>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await apiClient.get("admins/users", {
        params: {
          page: 1,
        },
      });
      return response.data;
    },
  });

  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (isError) {
    return <div className="alert alert-error">Error loading users.</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      {users.payload.map((user, index) => (
        <div key={user.id} className="card card-compact bg-base-100 shadow-md">
          <div className="card-body p-4">
            <h2 className="card-title text-lg">
              {index + 1}. {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-sm">
              <strong>Phone:</strong> {user.phone}
            </p>
            <p className="text-sm">
              <strong>Role:</strong> {user.role}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
