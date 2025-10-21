import apiClient, { type ApiResponse } from "@/api/apiClient";
import type { SingleFoodProps } from "@/api/types";
import SimpleCarousel from "@/components/SimpleCarousel";
import SimpleLoader from "@/components/SimpleLoader";
import { extract_message } from "@/helpers/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  DollarSign,
  CheckCircle,
  Package,
  CalendarPlus,
  CalendarClock,
  Edit,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

export default function index() {
  const id = useParams({
    from: "/app/food/$id",
    select: (params) => params.id,
  });
  const nav = useNavigate();
  const query = useQuery<ApiResponse<SingleFoodProps>>({
    queryKey: ["food-item", id],
    queryFn: async () => {
      let resp = await apiClient.get("admins/foods/" + id);
      return resp.data;
    },
  });

  const delete_mutation = useMutation({
    mutationFn: async () => {
      let resp = await apiClient.delete("admins/foods/" + id);
      return resp.data;
    },
    onSuccess: () => {
      nav({
        to: "/app/food",
      });
    },
  });
  if (query.isLoading) {
    return <SimpleLoader />;
  }
  if (query.isError) {
    return (
      <div className="flex justify-center items-center h-screen text-error text-xl">
        Error loading food item.
      </div>
    );
  }
  const food = query.data?.payload;

  if (!food) {
    return (
      <div className="flex justify-center items-center h-screen text-warning text-xl">
        Food item not found.
      </div>
    );
  }

  return (
    <div className="container mx-auto  ">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-primary">
        Food Item Details
      </h1>
      <div className="bg-base-100 shadow-xl rounded-lg p-6 space-y-4 md:p-8">
        <div className="relative h-[420px] ">
          {food.imageUrls.length > 0 ? (
            <SimpleCarousel>
              {food.imageUrls.map((item, index) => (
                <div key={index} className="h-[420px] w-full">
                  <img
                    src={item.url}
                    className="size-full object-cover"
                    alt={`Food image ${index + 1}`}
                  />
                </div>
              ))}
            </SimpleCarousel>
          ) : (
            <div className="h-[420px] bg-base-300 grid place-items-center">
              <h2 className="label text-4xl">No Images</h2>
            </div>
          )}
        </div>
        <div className="pb-6 md:pb-8">
          <h2 className="text-3xl font-bold mb-2 text-secondary">
            {food.name}
          </h2>
          <p className="text-lg text-base-content mb-4 leading-relaxed">
            {food.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <DollarSign className="text-primary" size={24} />
              <span className="text-xl font-semibold text-primary">Price:</span>
              <span className="text-2xl font-bold text-accent">
                ${parseFloat(food.price).toFixed(2)}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="text-primary" size={24} />
              <span className="text-xl font-semibold text-primary">
                Available:
              </span>
              <input
                type="checkbox"
                className="checkbox checkbox-primary checkbox-lg"
                checked={food.isAvailable}
                readOnly
              />
              <span className="text-lg">{food.isAvailable ? "Yes" : "No"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="text-primary" size={24} />
              <span className="text-xl font-semibold text-primary">
                Quantity:
              </span>
              <span className="text-xl text-base-content font-medium">
                {food.quantity}
              </span>
            </div>
          </div>

          <div className="border-t border-base-200 pt-4 mt-4">
            <p className="text-sm text-base-content-secondary mb-1">
              <CalendarPlus className="inline-block mr-1" size={16} />
              <span className="font-medium">Created At:</span>{" "}
              {new Date(food.createdAt).toLocaleString()}
            </p>
            <p className="text-sm text-base-content-secondary">
              <CalendarClock className="inline-block mr-1" size={16} />
              <span className="font-medium">Last Updated:</span>{" "}
              {new Date(food.updatedAt).toLocaleString()}
            </p>
          </div>

          <div className="flex justify-end mt-6 gap-3">
            <Link
              viewTransition
              to="/app/food/$id/edit"
              params={{
                id: id,
              }}
              className="btn btn-secondary btn-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Edit size={20} />
              Edit Food
            </Link>
            <button
              disabled={delete_mutation.isPending}
              onClick={() => {
                toast.promise(delete_mutation.mutateAsync, {
                  loading: "deleting",
                  success: extract_message,
                  error: extract_message,
                });
              }}
              className="btn btn-error btn-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Trash2 size={20} />
              Delete Food
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
