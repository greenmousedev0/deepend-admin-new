import apiClient from "@/api/apiClient";
import Modal from "@/components/dialogs-modals/SimpleModal";
import SimpleInput from "@/components/SimpleInput";
import { extract_message } from "@/helpers/auth";
import { useModal } from "@/store/modals";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function VRCategoryCard(props: {
  item: { name: string; id: string; description: string };
  refetch: () => any;
}) {
  const { item } = props;
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: item.name,
      description: item.description,
    },
  });
  const edit_mutation = useMutation({
    mutationFn: async (data: any) => {
      let resp = await apiClient.put(
        "admins/vrgames/categories/" + item.id,
        data,
      );
      return resp.data;
    },
    onSuccess: () => {
      props.refetch();
      modal.closeModal();
      toast.success("Category updated successfully");
    },
  });
  const modal = useModal();
  return (
    <>
      <Modal ref={modal.ref}>
        <form
          action=""
          className="space-y-4 py-4"
          onSubmit={handleSubmit((data) => {
            toast.promise(edit_mutation.mutateAsync(data), {
              success: "Category updated successfully",
              error: "Failed to update category",
              loading: "Updating category...",
            });
          })}
        >
          <h2>Edit Vr Category</h2>
          <SimpleInput label="Name" {...register("name")} />
          <SimpleInput label="Description" {...register("description")} />
          <button
            disabled={edit_mutation.isPending}
            type="submit"
            className="btn btn-primary btn-block"
          >
            Save
          </button>
        </form>
      </Modal>
      <li className="space-y-2 bg-base-100 p-4 rounded-md shadow" key={item.id}>
        <h2 className="text-lg capitalize">{item.name}</h2>
        <p className="fieldset-label">{item.description}</p>
        <div className="flex">
          <button
            className="btn ml-auto btn-error"
            onClick={() => {
              toast.promise(
                async () => {
                  let resp = await apiClient.delete(
                    "admins/vrgames/categories/" + item.id,
                  );
                  props.refetch();
                  return resp.data;
                },
                {
                  success: extract_message,
                  error: extract_message,
                  loading: "Deleting category...",
                },
              );
            }}
          >
            Delete
          </button>
          <button
            className="btn ml-2 btn-info"
            onClick={() => modal.showModal()}
          >
            Edit
          </button>
        </div>
      </li>
    </>
  );
}
