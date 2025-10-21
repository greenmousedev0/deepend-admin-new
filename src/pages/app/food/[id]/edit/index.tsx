import apiClient, { type ApiResponse } from "@/api/apiClient";
import type { SingleFoodProps } from "@/api/types";
import SimpleInput from "@/components/SimpleInput";
import SimpleLoader from "@/components/SimpleLoader";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { extract_message } from "@/helpers/auth";
import { uploadToCloudinary } from "@/api/cloud";

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
  const [images, setImages] = useState<
    (File | { url: string; path: string })[]
  >([]);
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
      setImages(foodData.imageUrls);
    }
  }, [query.data, reset]);

  const updateFoodMutation = useMutation({
    mutationFn: async (data: UpdateFoodItemProps) => {
      let imageUrls: { url: string; path: string }[] = [];
      const filesToUpload = images.filter(
        (img) => img instanceof File,
      ) as File[];

      if (filesToUpload.length > 0) {
        const uploaded = await uploadToCloudinary(
          filesToUpload as unknown as FileList,
        );
        imageUrls = uploaded.map(({ url, path }) => ({ url, path }));
      }

      const existingImages = images.filter((img) => !(img instanceof File)) as {
        url: string;
        path: string;
      }[];
      const finalImageUrls = [...existingImages, ...imageUrls];

      const resp = await apiClient.put("admins/foods/" + id, {
        ...data,
        imageUrls: finalImageUrls,
      });
      return resp.data;
    },
    onSuccess: () => {
      nav({ to: "/app/food" });
      toast.success("Food item updated successfully!");
    },
  });

  const onSubmit = (data: UpdateFoodItemProps) => {
    toast.promise(() => updateFoodMutation.mutateAsync(data), {
      loading: "Updating food item...",
      success: extract_message,
      error: extract_message,
    });
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove),
    );
  };

  if (query.isLoading) return <SimpleLoader />;
  if (query.isError) return <div>Error loading food item.</div>;

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2">
          {images.map((img, index) => (
            <div key={index} className="w-full relative group">
              <img
                src={img instanceof File ? URL.createObjectURL(img) : img.url}
                alt={`Food Image ${index + 1}`}
                className="h-[220px] w-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 btn btn-circle btn-xs btn-error opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
            </div>
          ))}
          <div className="w-full h-[220px] bg-base-200 grid place-items-center">
            <label
              htmlFor="add-image-input"
              className="cursor-pointer btn btn-ghost"
            >
              Add Image
              <input
                id="add-image-input"
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    setImages((prev) => [...prev, ...Array.from(files)]);
                  }
                }}
              />
            </label>
          </div>
        </div>
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
