import apiClient from "@/api/apiClient";
import { uploadToCloudinary } from "@/api/cloud";
import type { HotelInfo } from "@/api/types";
import FieldSet from "@/components/FieldSet";
import SimpleInput from "@/components/SimpleInput";
import SimpleTextArea from "@/components/SimpleTextArea";
import UpdateImages from "@/components/UpdateImages";
import { extract_message } from "@/helpers/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { XCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function HotelEditForm({ item }: { item: HotelInfo }) {
  const { register, handleSubmit } = useForm<Partial<HotelInfo>>({
    defaultValues: {
      name: item.name,
      description: item.description,
      city: item.city,
      state: item.state,
      country: item.country,
      address: item.address,
      imageUrls: item.imageUrls,
      //@ts-ignore
      latitude: item.latitude,
      //@ts-ignore

      longitude: item.longitude,
    },
  });
  const [newImages, setNewImages] = useState<FileList>();
  const [images, setImages] = useState<HotelInfo["imageUrls"]>(item.imageUrls);
  const nav = useNavigate();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: Partial<HotelInfo>) => {
      if (newImages.length > 0) {
        const uploaded = await uploadToCloudinary(newImages);
        const imageurls = uploaded.map((item) => {
          return {
            url: item.url,
            path: item.path,
          };
        });

        const new_images = [...images, ...imageurls];
        data.imageUrls = new_images;
      }
      const resp = await apiClient.put("admins/hotels/" + item.id, data);
      return resp.data;
    },
    onSuccess: () => {
      nav({
        to: "/app/hotel/" + item.id,
      });
    },
  });
  const onSubmit = (data: Partial<HotelInfo>) => {
    console.log(data);
    toast.promise(mutateAsync(data), {
      loading: "Updating...",
      success: extract_message,
      error: extract_message,
    });
  };
  return (
    <div className="p-2 bg-base-100 rounded-md">
      <div className="">
        <UpdateImages
          images={images}
          setNew={setNewImages}
          setPrev={setImages}
        />
        {/*<div className="h-20"></div>*/}
      </div>
      <form
        action=""
        className="space-y-4 p-4 relative overflow-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <SimpleInput label="Name" {...register("name")} />
        <SimpleTextArea label="description" {...register("description")} />
        <FieldSet title="Location">
          <SimpleInput label="Address" {...register("address")} />
          <SimpleInput label="City" {...register("city")} />
          <SimpleInput label="Country" {...register("country")} />
          <SimpleInput label="State" {...register("state")} />
        </FieldSet>

        <button className="btn btn-primary float-right" disabled={isPending}>
          Update
        </button>
      </form>
    </div>
  );
}
