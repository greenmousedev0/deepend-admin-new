import apiClient from "@/api/apiClient";
import type { Amenity } from "@/api/types";
import Modal from "@/components/dialogs-modals/SimpleModal";
import SimpleInput from "@/components/SimpleInput";
import { extract_message } from "@/helpers/auth";
import { useModal } from "@/store/modals";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AmenityCard({
  item,
  refetch,
}: {
  item: Amenity;
  refetch: () => void;
}) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      let resp = await apiClient.delete(`admins/hotels/amenities/` + item.id);
      return resp.data;
    },
    onSuccess: () => {
      refetch();
    },
  });

  const form = useForm<Partial<Amenity>>({
    defaultValues: {
      name: item.name,
    },
  });
  const modal = useModal();
  const onSubmit = (data: Partial<Amenity>) => {
    toast.promise(() => edit.mutateAsync(data), {
      loading: "Editing..." + item.name,
      success: extract_message,
      error: extract_message,
    });
  };
  const edit = useMutation({
    mutationFn: async (data: Partial<Amenity>) => {
      let resp = await apiClient.put(
        `admins/hotels/amenities/` + item.id,
        data,
      );
      return resp.data;
    },
    onSuccess: () => {
      modal.closeModal();
      refetch();
    },
  });

  return (
    <>
      <li key={item.id} className=" bg-base-100 shadow p-2">
        <div className="">
          <img
            src={item.icon}
            className="p-2 h-12 bg-white rounded-xl"
            alt=""
          />
        </div>
        <h2 className="text-lg font-bold">Name: {item.name}</h2>
        <div className="flex">
          <button
            onClick={() => {
              toast.promise(mutateAsync, {
                loading: "Deleting..." + item.name,
                success: extract_message,
                error: extract_message,
              });
            }}
            disabled={isPending}
            className="btn btn-error ml-auto"
          >
            Delete
          </button>
          <button
            onClick={modal.showModal}
            disabled={isPending || edit.isPending}
            className="btn btn-info"
          >
            Edit
          </button>
        </div>
      </li>
      <Modal ref={modal.ref}>
        <div>
          <form
            action=""
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <h2 className="font-bold text-xl">Edit {item.name}</h2>
            <SimpleInput {...form.register("name")} label="Name" />
            <button
              disabled={isPending || edit.isPending}
              className="btn btn-block btn-success"
            >
              Edit
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}
