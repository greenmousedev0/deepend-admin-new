import apiClient, { type ApiResponse } from "@/api/apiClient";
import SuspenseCompLayout from "@/components/layout/SuspenseComponentLayout";
import { useQuery } from "@tanstack/react-query";

export default function Snacks({ id }: { id: string }) {
  const query = useQuery<ApiResponse<any[]>>({
    queryKey: ["snacks", id],
    queryFn: async () => {
      const response = await apiClient(`admins/movies/${id}/snacks`);
      return response.data;
    },
  });
  return (
    <SuspenseCompLayout query={query}>
      {(data) => {
        return (
          <section className="space-y-2">
            <h2 className="text-2xl font-bold fieldset-label ">Snacks</h2>
            <ul className="menu bg-base-300 w-full">
              {data?.payload?.map((snack) => {
                return (
                  <>
                    <li>
                      <a href="">
                        <div>
                          <div>{snack.name}</div>
                          <div>Price: {snack.price}</div>
                        </div>
                      </a>
                    </li>
                  </>
                );
              })}
            </ul>
          </section>
        );
      }}
    </SuspenseCompLayout>
  );
}
