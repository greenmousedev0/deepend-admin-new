import { useNavigate } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import type { UpdateFoodItemProps } from "../[id]/edit";
import { useMutation } from "@tanstack/react-query";
import apiClient from "@/api/apiClient";
import { toast } from "sonner";
import { extract_message } from "@/helpers/auth";
import SimpleInput from "@/components/SimpleInput";
import { uploadToCloudinary } from "@/api/cloud";
import SimpleCarousel from "@/components/SimpleCarousel";
import { useState } from "react";
import SimpleSelect from "@/components/SimpleSelect";
import type { FoodCategory } from "@/api/types";
import SimpleTextArea from "@/components/SimpleTextArea";

export default function index() {
  const nav = useNavigate();
  const form = useForm<UpdateFoodItemProps>();
  const { register, handleSubmit, control } = form;
  const [images, setImages] = useState<FileList>();
  const createFoodMutation = useMutation({
    mutationFn: async (data: UpdateFoodItemProps) => {
      let imageUrls: { url: string; path: string }[] = [];

      if (images) {
        const uploaded = await uploadToCloudinary(images);
        imageUrls = uploaded.map(({ url, path }) => ({ url, path }));
      }

      const resp = await apiClient.post("admins/foods", { ...data, imageUrls });
      return resp.data;
    },
    onSuccess: () => {
      nav({ to: "/app/food" });
      toast.success("Food item created successfully!");
    },
  });

  const onSubmit = (data: UpdateFoodItemProps) => {
    toast.promise(() => createFoodMutation.mutateAsync(data), {
      loading: "Creating food item...",
      success: extract_message,
      error: extract_message,
    });
  };

  return (
    <div className="p-4">
      <div className="h-[420px] mx-auto mb-8">
        {images && images.length > 0 ? (
          <SimpleCarousel>
            {Array.from(images).map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt="Food Image"
                className="h-[420px] w-full object-cover"
              />
            ))}
          </SimpleCarousel>
        ) : (
          <div className=" text-2xl grid place-items-center h-full bg-base-300">
            <label htmlFor="hidden-input" className="cursor-pointer">
              Click To Select Images
              <input
                onChange={(e) => {
                  let files = e.target.files;
                  if (files && files.length > 0) {
                    console.log(files);
                    setImages(files);
                  }
                }}
                type="file"
                accept="image/*"
                multiple
                hidden
                id="hidden-input"
              />
            </label>
          </div>
        )}
      </div>
      {/*<input
        className="file-input"
        type="file"
        multiple
        accept="image/*"
        name=""
        id=""
        onClick={(e) => {
          let files = e.target.files;
          if (files && files.length > 0) {
            const file = files[0];
            uploadToCloudinary(files);
          }
        }}
      />*/}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Add New Food</h2>
        <SimpleInput label="Name" {...register("name", { required: true })} />
        <SimpleTextArea
          label="Description"
          {...register("description", { required: true })}
        />
        <SimpleInput
          label="Price"
          type="number"
          step="0.01"
          {...register("price", { required: true, valueAsNumber: true })}
        />
        {/*<SimpleInput
          label="Category ID"
          type="number"
          {...register("categoryId", { required: true, valueAsNumber: true })}
        />*/}
        <Controller
          control={control}
          name="categoryId"
          render={({ field }) => {
            return (
              <>
                {field.value}{" "}
                <SimpleSelect
                  label="Category"
                  value={field.value}
                  onChange={field.onChange}
                  route="admins/foods/categories"
                  render={(item: FoodCategory) => {
                    return <option value={item.id}>{item.name}</option>;
                  }}
                />
              </>
            );
          }}
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
