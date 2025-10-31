import apiClient from "@/api/apiClient";
import type { RentalEquipment } from "@/api/types";
import { extract_message } from "@/helpers/auth";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

export default function EquipmentCard({
  itm,
  refetch,
}: {
  itm: RentalEquipment;
  refetch: () => any;
}) {
  return (
    <div className="card w-full  bg-base-100 shadow-xl p-4 flex flex-col gap-4">
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
              <h2 className="card-title text-lg line-clamp-2">{itm.name}</h2>
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
          <Link
            to={`/app/equipment/${itm.id}/edit`}
            className="btn btn-accent btn-sm"
          >
            Edit
          </Link>
          <button
            className="btn btn-error btn-sm"
            onClick={() => {
              toast.promise(
                async () => {
                  let resp = await apiClient.delete(
                    `admins/equipments/${itm.id}`,
                  );
                  refetch();
                  return resp.data;
                },
                {
                  loading: "Deleting..." + itm.name,
                  success: extract_message,
                  error: extract_message,
                },
              );
            }}
          >
            Delete
          </button>
          <Link className="btn btn-info btn-sm" to={`/app/equipment/${itm.id}`}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
