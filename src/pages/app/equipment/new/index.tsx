import apiClient, { type ApiResponse } from "@/api/apiClient";
import { uploadToCloudinary } from "@/api/cloud";
import type { RentalEquipment } from "@/api/types";
import SimpleInput from "@/components/SimpleInput";
import SimpleSelect from "@/components/SimpleSelect";
import SimpleTextArea from "@/components/SimpleTextArea";
import UpdateImages from "@/components/UpdateImages";
import { extract_message } from "@/helpers/auth";
import { useImages } from "@/helpers/images";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function index() {
  const { register, handleSubmit, control } =
    useForm<Partial<RentalEquipment>>();
  const onSumbit = (data: Partial<RentalEquipment>) => {
    if (!props.newImages) return toast.error("Please upload images");
    toast.promise(mutateAsync(data), {
      loading: "uploading",
      success: "uploaded",
      error: extract_message,
    });
  };
  const props = useImages();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: Partial<RentalEquipment>) => {
      //@ts-ignore
      const images = await uploadToCloudinary(props.newImages);
      //@ts-ignore
      data["imageUrls"] = images;
      let resp = await apiClient.post("admins/equipments", data);
      return resp.data;
    },
    onSuccess: (data: ApiResponse) => {
      window.location.href = "/app/equipment/" + data.payload.id;
    },
  });

  return (
    <>
      <div className="">
        <h2 className="text-2xl font-bold my-4">Create New Rental Item</h2>
        <UpdateImages {...props} />
        <form action="" onSubmit={handleSubmit(onSumbit)} className="space-y-4">
          <SimpleInput {...register("name")} label="Name" />
          <SimpleTextArea {...register("description")} label="Description" />
          <SimpleInput
            {...register("quantityAvailable")}
            label="Quantity Available"
          />
          <SimpleInput
            {...register("rentalPricePerDay")}
            label="Rental Price Per Day"
          />
          <SimpleInput
            {...register("address")}
            label="Address"
            type="address"
          />
          <Controller
            control={control}
            //@ts-ignore
            name="categoryId"
            render={({ field }) => {
              return (
                <SimpleSelect
                  {...field}
                  label="Category"
                  route="admins/equipments/categories"
                  render={(item: any) => {
                    return <option value={item.id}>{item.name}</option>;
                  }}
                />
              );
            }}
          ></Controller>
          <button disabled={isPending} className="btn btn-primary btn-block">
            Create New
          </button>
        </form>
      </div>
    </>
  );
}
