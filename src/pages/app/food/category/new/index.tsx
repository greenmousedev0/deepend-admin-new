import apiClient from "@/api/apiClient";
import SimpleHeader from "@/components/SimpleHeader";
import SimpleInput from "@/components/SimpleInput";
import { extract_message } from "@/helpers/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { uploadToCloudinary } from "@/api/cloud";
import { useState } from "react";
import SimpleTextArea from "@/components/SimpleTextArea";

interface NewFoodCategoryProps {
  name: string;
  icon: string;
  description: string;
}

export default function index() {
  const form = useForm<NewFoodCategoryProps>({
    defaultValues: {
      icon: "",
      name: "",
      description: "",
    },
  });
  const nav = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: NewFoodCategoryProps) => {
      let iconUrl = data.icon;
      if (selectedFile) {
        //@ts-ignore
        const uploaded = await uploadToCloudinary([selectedFile] as FileList);
        if (uploaded.length > 0) {
          iconUrl = uploaded[0].url;
        }
      }
      const resp = await apiClient.post("admins/foods/categories", {
        ...data,
        icon: iconUrl,
      });
      return resp.data;
    },
    onSuccess: () => {
      nav({
        to: "/app/food/category",
      });
    },
  });
  const { register, handleSubmit, setValue, watch } = form;
  const onSubmit = (data: NewFoodCategoryProps) => {
    toast.promise(() => mutateAsync(data), {
      loading: "pending",
      success: extract_message,
      error: extract_message,
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setValue("icon", URL.createObjectURL(event.target.files[0])); // Set a temporary URL for preview
    } else {
      setSelectedFile(null);
      setValue("icon", "");
    }
  };

  const currentIcon = watch("icon");

  return (
    <div>
      <SimpleHeader title={"Create New Category"}></SimpleHeader>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className="space-y-4 p-4 bg-base-100 ring ring-current/20"
      >
        <SimpleInput label="Name" {...register("name")} />

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

        <SimpleTextArea label="Description" {...register("description")} />
        <button disabled={isPending} className="btn btn-block btn-primary">
          Create Food Category
        </button>
      </form>
    </div>
  );
}
