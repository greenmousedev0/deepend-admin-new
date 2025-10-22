import apiClient, { type ApiResponse } from "@/api/apiClient";
import type { Amenity } from "@/api/types";
import EmptyList from "@/components/EmptyList";
import SimpleHeader from "@/components/SimpleHeader";
import SimpleLoader from "@/components/SimpleLoader";
import SimplePaginator from "@/components/SimplePaginator";
import { usePagination } from "@/store/pagination";
import { useMutation, useQuery } from "@tanstack/react-query";
import AmenityCard from "../_components/AmenityCard";
import Modal from "@/components/dialogs-modals/SimpleModal";
import { useModal } from "@/store/modals";
import { useForm } from "react-hook-form";
import SimpleInput from "@/components/SimpleInput";
import { useState } from "react";
import SelectImage from "@/components/SelectImage";
import { toast } from "sonner";
import { extract_message } from "@/helpers/auth";
import { uploadToCloudinary } from "@/api/cloud";

export default function index() {
  const props = usePagination();
  const query = useQuery<ApiResponse<Amenity[]>>({
    queryKey: ["amenities", props.page],
    queryFn: async () => {
      let resp = await apiClient.get("admins/hotels/amenities", {
        params: {
          page: props.page,
          limit: 10,
        },
      });
      return resp.data;
    },
  });
  const modal = useModal();
  const [image, setImage] = useState<File>(null);

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: any) => {
      //@ts-ignore
      const [uploadedImage] = await uploadToCloudinary([image]);
      data.icon = uploadedImage.url;
      data.iconPath = uploadedImage.path;

      let resp = await apiClient.post("admins/hotels/amenities", {
        amenities: [data],
      });
      return resp.data;
    },
    onSuccess: () => {
      query.refetch();
      modal.closeModal();
    },
  });
  const onSubmit = (data: Partial<Amenity>) => {
    if (!image) return toast.error("Please select an image");
    toast.promise(mutateAsync(data), {
      loading: "Adding...",
      success: extract_message,
      error: extract_message,
    });
  };
  const { register, handleSubmit } = useForm<Partial<Amenity>>();
  if (query.isLoading) {
    return (
      <>
        <SimpleHeader title={"Hotel Amenities"} />
        <SimpleLoader />
      </>
    );
  }

  const items = query.data.payload;
  return (
    <div>
      <Modal ref={modal.ref}>
        <div className="">
          <form
            action=""
            className="space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="font-bold text-xl">Add New Amenity</h2>
            <SelectImage setImage={setImage} image={image} />

            <SimpleInput {...register("name")} label="Name" />
            <button disabled={isPending} className="btn btn-block btn-success">
              Add
            </button>
          </form>
        </div>
      </Modal>
      <SimpleHeader title={"Hotel Amenities"}>
        <button onClick={() => modal.showModal()} className="btn btn-primary">
          Add New Amenity{" "}
        </button>
      </SimpleHeader>
      <div className="">
        <ul className="menu bg-base-200 w-full rounded-box space-y-3">
          {items.map((item) => (
            <AmenityCard key={item.id} item={item} refetch={query.refetch} />
          ))}
        </ul>
        <EmptyList list={items} />
        <SimplePaginator {...props} />
      </div>
    </div>
  );
}
