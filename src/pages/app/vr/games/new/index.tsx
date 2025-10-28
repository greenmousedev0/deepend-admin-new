import apiClient, { type ApiResponse } from "@/api/apiClient";
import { uploadToCloudinary } from "@/api/cloud";
import type { Vrgame } from "@/api/types";
import SimpleHeader from "@/components/SimpleHeader";
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
  const form = useForm<Partial<Vrgame>>();
  const props = useImages();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: Partial<Vrgame>) => {
      if (props.newImages || props.newImages.length > 0) {
        //@ts-ignore
        const images = await uploadToCloudinary(props.newImages);
        data["imageUrls"] = images;
      }
      let resp = await apiClient.post("admins/vrgames", data);
      return resp.data;
    },
    onSuccess: (data: ApiResponse) => {
      window.location.href = "/app/vr/games/" + data.payload.id;
    },
  });

  return (
    <>
      <SimpleHeader title={"New Game"} />
      <form
        onSubmit={form.handleSubmit((data) => {
          console.log(data);
          toast.promise(mutateAsync(data), {
            loading: "Adding new game...",
            success: "Game added successfully!",
            error: extract_message,
          });
        })}
        className="space-y-4"
      >
        <UpdateImages {...props} />
        <SimpleInput {...form.register("name")} label="Name" />
        <SimpleTextArea {...form.register("description")} label="Description" />

        <Controller
          name="categoryId"
          control={form.control}
          render={({ field }) => {
            return (
              <>
                <SimpleSelect
                  {...field}
                  label="CategoryId"
                  route="admins/vrgames/categories"
                  render={(item: any) => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    );
                  }}
                />
              </>
            );
          }}
        />
        <SimpleInput
          {...form.register("ageRating", { valueAsNumber: true })}
          label="Age Rating"
          type="number"
        />
        <SimpleInput {...form.register("ticketPrice")} label="Ticket Price" />
        <SimpleInput
          {...form.register("ticketQuantity", { valueAsNumber: true })}
          label="Ticket Quantity"
          type="number"
        />
        <button className="btn btn-primary">Add New Game</button>
      </form>
    </>
  );
}
