import apiClient from "@/api/apiClient";
import { uploadToCloudinary } from "@/api/cloud";
import type { Vrgame } from "@/api/types";
import SimpleInput from "@/components/SimpleInput";
import SimpleSelect from "@/components/SimpleSelect";
import SimpleTextArea from "@/components/SimpleTextArea";
import UpdateImages from "@/components/UpdateImages";
import { extract_message } from "@/helpers/auth";
import { useImages } from "@/helpers/images";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function GameEditForm({ item }: { item: Vrgame }) {
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: item,
  });
  const props = useImages(item.imageUrls);
  const onSubmit = (data: Partial<Vrgame>) => {
    toast.promise(mutateAsync(data), {
      loading: "loading",
      success: extract_message,
      error: extract_message,
    });
  };
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: Partial<Vrgame>) => {
      data.imageUrls = props.images;
      if (props.newImages) {
        const uploads = await uploadToCloudinary(props.newImages as any);
        data.imageUrls = [...data.imageUrls, ...uploads];
      }
      let resp = await apiClient.put("admins/vrgames/" + item.id, {
        ticketQuantity: data.ticketQuantity,
        name: data.name,
        description: data.description,
        categoryId: data.categoryId,
        imageUrls: data.imageUrls,
        ageRating: data.ageRating,
        ticketPrice: data.ticketPrice,
      });
      return resp.data;
    },
    onSuccess: () => {
      window.location.href = "/app/vr/games/" + item.id;
    },
  });
  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <UpdateImages {...props} />
      <SimpleInput {...register("name")} label="Name" />

      <SimpleTextArea {...register("description")} label="Description" />
      <SimpleInput
        {...register("ticketQuantity")}
        label="Ticket Quantity"
        type="number"
      />
      <Controller
        control={control}
        name="categoryId"
        render={({ field }) => (
          <SimpleSelect
            {...field}
            route="admins/vrgames/categories"
            label="category"
            render={(item: any) => {
              return (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              );
            }}
          />
        )}
      ></Controller>
      <SimpleInput
        {...register("ticketPrice")}
        label="Ticket Price"
        type="number"
      />
      <SimpleInput
        {...register("ageRating")}
        label="Age Rating"
        type="number"
      />
      <button className="btn btn-primary float-right">Submit</button>
    </form>
  );
}
