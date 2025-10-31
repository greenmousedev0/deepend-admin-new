import apiClient, { type ApiResponse } from "@/api/apiClient";
import { uploadToCloudinary } from "@/api/cloud";
import type { RentalEquipment } from "@/api/types";
import SimpleCheckbox from "@/components/SimpleCheckbox";
import SimpleInput from "@/components/SimpleInput";
import SimpleSelect from "@/components/SimpleSelect";
import SimpleTextArea from "@/components/SimpleTextArea";
import UpdateImages from "@/components/UpdateImages";
import { extract_message } from "@/helpers/auth";
import { useImages } from "@/helpers/images";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function EditFormRental({ item }: { item: RentalEquipment }) {
  delete item.isAvailable;

  const form = useForm<Partial<RentalEquipment>>({
    defaultValues: item,
  });
  const edit_mutation = useMutation({
    mutationFn: async (data: Partial<RentalEquipment>) => {
      data.imageUrls = props.images;
      if (props.newImages) {
        //@ts-ignore
        const images = await uploadToCloudinary(props.newImages);
        data["imageUrls"] = [...props.images, ...images];
      }
      ["id", "createdAt", "updatedAt", "category"].forEach(
        (key) => delete data[key],
      );
      // delete data.id;
      // delete
      let resp = await apiClient.put("admins/equipments/" + item.id, data);
      return resp.data;
    },
    onSuccess: (data: ApiResponse) => {
      console.log(data);
      window.location.href = "/app/equipment/" + item.id;
    },
  });
  const onSubmit = (data: Partial<RentalEquipment>) => {
    // return console.log(props.images);
    console.log(data);
    toast.promise(edit_mutation.mutateAsync(data), {
      loading: "Updating...",
      success: extract_message,
      error: extract_message,
    });
    // edit_mutation.mutate(data);
  };
  const props = useImages(item.imageUrls);
  return (
    <>
      <UpdateImages {...props} />
      <form
        action=""
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <SimpleInput {...form.register("name")} label="Name" />
        <SimpleTextArea {...form.register("description")} label="Description" />
        <Controller
          control={form.control}
          //@ts-ignore
          name="categoryId"
          render={({ field }) => {
            return (
              <SimpleSelect
                {...field}
                label="Category"
                route="admins/equipments/categories"
                render={(item: any, index) => {
                  if (index === 0) {
                    return (
                      <option defaultValue={item.id} value={item.id}>
                        {item.name}
                      </option>
                    );
                  }
                  return <option value={item.id}>{item.name}</option>;
                }}
              />
            );
          }}
        ></Controller>
        <SimpleInput
          {...form.register("rentalPricePerDay")}
          label="PricePerDay"
          type="number"
          min={0}
        />
        <SimpleInput
          {...form.register("quantityAvailable")}
          label="Quantity"
          type="number"
          min={0}
        />
        <SimpleInput {...form.register("address")} label="Address" />
        {/*<div></div>*/}
        {/*<SimpleCheckbox
          {...form.register("isAvailable")}
          label="Is Available"
        />*/}
        <button className="btn btn-primary btn-block">Update</button>
      </form>
    </>
  );
}
