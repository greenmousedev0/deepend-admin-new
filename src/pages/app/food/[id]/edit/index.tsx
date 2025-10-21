import apiClient, { type ApiResponse } from "@/api/apiClient";
import type { SingleFoodProps } from "@/api/types";
import SimpleInput from "@/components/SimpleInput";
import SimpleLoader from "@/components/SimpleLoader";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "sonner";
import { extract_message } from "@/helpers/auth";

export interface UpdateFoodItemProps {
  quantity: number;
  name: string;
  description: string;
  price: string;
  categoryId: number;
  imageUrls: {
    url: string;
    path: string;
  }[];
}
export default function index() {
  const id = useParams({
    from: "/app/food/$id/edit",
    select: (params) => params.id,
  });

  const query = useQuery<ApiResponse<SingleFoodProps>>({
    queryKey: ["food-item", id],
    queryFn: async () => {
      let resp = await apiClient.get("admins/foods/" + id);
      return resp.data;
    },
  });
  const nav = useNavigate();
  const form = useForm<UpdateFoodItemProps>();
  const { register, handleSubmit, reset } = form;

  useEffect(() => {
    if (query.data) {
      const foodData = query.data.payload;
      reset({
        name: foodData.name,
        description: foodData.description,
        price: foodData.price,
        categoryId: foodData.categoryId,
        quantity: foodData.quantity,
        imageUrls: foodData.imageUrls,
      });
    }
  }, [query.data, reset]);

  const updateFoodMutation = useMutation({
    mutationFn: async (data: UpdateFoodItemProps) => {
      const resp = await apiClient.put("admins/foods/" + id, data);
      return resp.data;
    },
    onSuccess: () => {
      nav({
        to: "/app/food/$id",
        params: {
          id: id,
        },
      });
      // Handle success, e.g., show a toast, invalidate queries
    },
  });

  const onSubmit = (data: UpdateFoodItemProps) => {
    toast.promise(updateFoodMutation.mutateAsync(data), {
      loading: "Updating food item...",
      success: extract_message,
      error: extract_message,
    });
  };

  if (query.isLoading) return <SimpleLoader />;
  if (query.isError) return <div>Error loading food item.</div>;

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Edit Food</h2>
        <SimpleInput label="Name" {...register("name", { required: true })} />
        <SimpleInput
          label="Description"
          {...register("description", { required: true })}
        />
        <SimpleInput
          label="Price"
          type="number"
          step="0.01"
          {...register("price", { required: true, valueAsNumber: true })}
        />
        <SimpleInput
          label="Category ID"
          type="number"
          {...register("categoryId", { required: true, valueAsNumber: true })}
        />
        <SimpleInput
          label="Quantity"
          type="number"
          {...register("quantity", { required: true, valueAsNumber: true })}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={updateFoodMutation.isPending}
        >
          {updateFoodMutation.isPending ? "Updating..." : "Update Food"}
        </button>
      </form>
    </div>
  );
}
