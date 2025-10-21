import apiClient from "@/api/apiClient";
import SimpleHeader from "@/components/SimpleHeader";
import SimpleInput from "@/components/SimpleInput";
import { extract_message } from "@/helpers/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface NewFoodCategoryProps {
  name: string;
  icon: "https://example.com/icons/fruits.png" | string;
  description: "A category for all kinds of fruits" | string;
}

export default function index() {
  const form = useForm<NewFoodCategoryProps>({
    defaultValues: {
      icon: "https://example.com/icons/fruits.png",
    },
  });
  const nav = useNavigate();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: any) => {
      let resp = await apiClient.post("admins/foods/categories", data);
      return resp.data;
    },
    onSuccess: (data) => {
      nav({
        to: "/app/food/category",
      });
    },
  });
  const { register } = form;
  const onSubmit = (data: NewFoodCategoryProps) => {
    toast.promise(() => mutateAsync(data), {
      loading: "pending",
      success: extract_message,
      error: extract_message,
    });
  };
  return (
    <div>
      <SimpleHeader title={"Create New Category"}></SimpleHeader>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        action=""
        className="space-y-4 p-4 bg-base-100 ring ring-current/20"
      >
        <SimpleInput label="Name" {...register("name")} />
        <SimpleInput label="Icon" {...register("icon")} />
        <SimpleInput label="Description" {...register("description")} />
        <button disabled={isPending} className="btn btn-block btn-primary">
          Create Food Category
        </button>
      </form>
    </div>
  );
}
