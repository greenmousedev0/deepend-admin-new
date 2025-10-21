import apiClient from "@/api/apiClient";
import type { FoodCategory } from "@/api/types";
import Modal from "@/components/dialogs-modals/SimpleModal";
import SimpleInput from "@/components/SimpleInput";
import { extract_message } from "@/helpers/auth";
import { useModal } from "@/store/modals";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { uploadToCloudinary } from "@/api/cloud";
import { useState } from "react";

export default function FoodCategoryCard({
  category,
  refetch,
}: {
  category: FoodCategory;
  refetch?: () => any;
}) {
  const delete_mutation = useMutation({
    mutationFn: async () => {
      let resp = await apiClient.delete(
        "/admins/foods/categories/" + category.id,
      );
      return resp.data;
    },
    onSuccess: () => {
      if (refetch) {
        refetch();
      }
    },
  });
  const form = useForm({
    defaultValues: {
      name: category.name,
      description: category.description,
      icon: category.icon,
    },
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const edit_mutation = useMutation({
    mutationFn: async (data: any) => {
      let iconUrl = data.icon;
      if (selectedFile) {
        //@ts-ignore
        const uploaded = await uploadToCloudinary([selectedFile] as FileList);
        if (uploaded.length > 0) {
          iconUrl = uploaded[0].url;
        }
      }
      let resp = await apiClient.put(
        "/admins/foods/categories/" + category.id,
        { ...data, icon: iconUrl },
      );
      return resp.data;
    },
    onSuccess: () => {
      if (refetch) {
        refetch();
      }
      closeModal();
    },
  });
  const onsubmit = (data: any) => {
    toast.promise(edit_mutation.mutateAsync(data), {
      loading: "Updating category...",
      success: extract_message,
      error: extract_message,
    });
  };
  const handleDelete = () => {
    toast.promise(delete_mutation.mutateAsync(), {
      loading: "Deleting category...",
      success: extract_message,
      error: extract_message,
    });
  };
  const { ref, showModal, closeModal } = useModal();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      form.setValue("icon", URL.createObjectURL(event.target.files[0])); // Set a temporary URL for preview
    } else {
      setSelectedFile(null);
      form.setValue("icon", category.icon); // Revert to original icon if no file selected
    }
  };

  const currentIcon = form.watch("icon");

  return (
    <>
      <div key={category.id} className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div>
            <img
              loading="lazy"
              src={category.icon}
              className="size-20"
              alt=""
            />
          </div>
          <h2 className="card-title">{category.name}</h2>
          <p>{category.description}</p>

          <div className="card-actions justify-end mt-4">
            <button
              disabled={delete_mutation.isPending}
              className="btn btn-sm btn-primary"
              onClick={() => {
                showModal();
              }}
            >
              Edit
            </button>
            <button
              disabled={delete_mutation.isPending}
              className="btn btn-sm btn-error"
              onClick={() => handleDelete()}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <Modal ref={ref}>
        <div>
          <h2 className="text-2xl font-bold mb-6">Edit Category</h2>
          <form
            action=""
            onSubmit={form.handleSubmit(onsubmit)}
            className="space-y-4"
          >
            <SimpleInput label="Name" {...form.register("name")} />
            <SimpleInput
              label="Description"
              {...form.register("description")}
            />
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Icon</span>
              </label>
              {currentIcon && (
                <div className="mb-4">
                  <img
                    src={currentIcon}
                    alt="Icon Preview"
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </div>
              )}
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
            <button
              className="mt-4 btn btn-primary btn-block"
              disabled={edit_mutation.isPending}
            >
              Update
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}
