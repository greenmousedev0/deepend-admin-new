import apiClient, { type ApiResponse } from "@/api/apiClient";
import { useQuery } from "@tanstack/react-query";

export default function Halls({ cinemaID }) {
  const query = useQuery<ApiResponse<[]>>({
    queryKey: ["cinema-halls", cinemaID],
    queryFn: async () => {
      const response = await apiClient.get(
        `admins/cinemas/:cinemaId/halls?page=1&limit=10`,
      );
      return response.data;
    },
  });

  if (query.isLoading) <div className="p-2 bg-base-300 rounded">loading</div>;
  if (query.isError) <div className="p-2 bg-base-300 rounded">error</div>;
  const items = query.data.payload;
  return (
    <>
      <h2 className="label mb-2">Halls ({items.length})</h2>
      <div className="p-4 bg-base-300">
        {items.map((item) => {
          return <></>;
        })}
      </div>
    </>
  );
}
