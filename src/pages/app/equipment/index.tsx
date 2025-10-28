import type { ApiResponse } from "@/api/apiClient";
import apiClient from "@/api/apiClient";
import type { RentalEquipment } from "@/api/types";
import QueryPageLayout from "@/components/layout/QueryPageLayout";
import SimplePaginator from "@/components/SimplePaginator";
import SimpleSelect from "@/components/SimpleSelect";
import { usePagination } from "@/store/pagination";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function index() {
  const [cat, setCat] = useState(null);
  const props = usePagination();
  const query = useQuery<ApiResponse<RentalEquipment[]>>({
    queryKey: ["vr", props.page, cat],
    queryFn: async () => {
      const params: Record<string, any> = { page: props.page };
      // only include categoryId if cat is not null
      // remove null/undefined keys from params
      Object.keys(params).forEach((key) => {
        if (params[key] == null) {
          delete params[key];
        }
      });

      const resp = await apiClient.get("admins/equipments", { params });
      return resp.data;
    },
  });
  const item = query.data?.payload;
  return (
    <QueryPageLayout
      query={query}
      title={"Equipment Rental Items"}
      headerActions={
        <>
          <SimpleSelect
            onChange={setCat}
            route="admins/equipments/categories"
            value={String(cat)}
            render={(item: { name: string; id: string }) => {
              return (
                <>
                  <option value={item.id}>{item.name}</option>
                </>
              );
            }}
          />
        </>
      }
    >
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-2">
        {item?.map((itm) => (
          <div
            key={itm.id}
            className="card w-full  bg-base-100 shadow-xl p-4 flex flex-col gap-4"
          >
            <figure className="w-full h-[200px]">
              {itm.imageUrls && itm.imageUrls.length > 0 ? (
                <img
                  src={itm.imageUrls[0].url}
                  alt={itm.name}
                  className="h-full w-full object-cover rounded-lg"
                />
              ) : (
                <img
                  src="https://picsum.photos/400/225"
                  alt="Placeholder"
                  className="h-full w-full object-cover rounded-lg"
                />
              )}
            </figure>
            <div className="flex flex-col justify-between">
              <div>
                <div className="space-y-4 mb-2">
                  <div className="flex justify-between items-center ">
                    <h2 className="card-title text-lg">{itm.name}</h2>
                  </div>
                  {itm.isAvailable ? (
                    <div className="badge badge-success badge-outline badge-sm">
                      Available
                    </div>
                  ) : (
                    <div className="badge badge-error badge-outline badge-sm">
                      Unavailable
                    </div>
                  )}
                </div>
                <p className="text-sm text-base-content/80 line-clamp-2 mb-3">
                  {itm.description}
                </p>
                <div className="flex flex-col gap-1 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Price per day:</span>
                    <span>${itm.rentalPricePerDay}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Quantity:</span>
                    <span>{itm.quantityAvailable}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Category:</span>
                    <div className="badge badge-info badge-outline badge-xs">
                      {itm.category.name}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-actions justify-end mt-3">
                <button className="btn btn-primary btn-xs">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <SimplePaginator {...props} />
      </div>
    </QueryPageLayout>
  );
}
