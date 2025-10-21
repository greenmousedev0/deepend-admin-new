import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import type { UpdateFoodItemProps } from "../[id]/edit";
import { useMutation } from "@tanstack/react-query";
import apiClient from "@/api/apiClient";
import { toast } from "sonner";
import { extract_message } from "@/helpers/auth";
import SimpleInput from "@/components/SimpleInput";

export default function index() {
  const nav = useNavigate();
  const form = useForm<UpdateFoodItemProps>();
  const { register, handleSubmit } = form;

  const createFoodMutation = useMutation({
    mutationFn: async (data: UpdateFoodItemProps) => {
      const resp = await apiClient.post("admins/foods", data);
      return resp.data;
    },
    onSuccess: () => {
      nav({
        to: "/app/food",
      });
      // Handle success, e.g., show a toast, invalidate queries
    },
  });

  const onSubmit = (data: UpdateFoodItemProps) => {
    toast.promise(createFoodMutation.mutateAsync(data), {
      loading: "Creating food item...",
      success: extract_message,
      error: extract_message,
    });
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Add New Food</h2>
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
          disabled={createFoodMutation.isPending}
        >
          {createFoodMutation.isPending ? "Adding..." : "Add Food"}
        </button>
      </form>
    </div>
  );
}
