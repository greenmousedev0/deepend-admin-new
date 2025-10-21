import apiClient from "@/api/apiClient";
import SimpleHeader from "@/components/SimpleHeader";
import SimpleInput from "@/components/SimpleInput";
import SimpleTextArea from "@/components/SimpleTextArea";
import { extract_message } from "@/helpers/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface CreateAddon {
  name: string;
  description: string;
}
export default function index() {
  const [addons, setAddons] = useState<CreateAddon[]>([]);
  const form = useForm<CreateAddon>();
  const { register } = form;
  const onSubmit = (data: CreateAddon) => {
    setAddons([...addons, data]);
    form.reset();
  };
  const nav = useNavigate();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      let resp = await apiClient.post("admins/foods/addons/categories", {
        addons: addons,
      });
      return resp.data;
    },
    onSuccess: () => {
      nav({
        to: "/app/food/addons",
      });
    },
  });
  const handleDeleteAddon = (indexToDelete: number) => {
    setAddons(addons.filter((_, index) => index !== indexToDelete));
  };
  const onUpload = () => {
    toast.promise(mutateAsync, {
      loading: "Uploading...",
      success: extract_message,
      error: extract_message,
    });
  };
  return (
    <div className="container  ">
      <SimpleHeader title={"Create New Addon"}>
        <button
          onClick={onUpload}
          className="btn btn-primary"
          disabled={addons.length < 1 || isPending}
        >
          Create Addons
        </button>
      </SimpleHeader>
      <div className="ring bg-base-100 p-4 ring-current/20 rounded-md ">
        <h2 className="text-lg font-bold mb-4">Addon List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {addons.length === 0 ? (
            <p className="text-neutral-content">No addons added yet.</p>
          ) : (
            addons.map((addon, index) => (
              <div
                key={addon.name}
                className="card card-compact bg-base-200 shadow-xl"
              >
                <div className="card-body">
                  <h3 className="card-title">{addon.name}</h3>
                  <p>{addon.description}</p>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleDeleteAddon(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <form
        className="space-y-4 card bg-base-100 shadow-xl p-4 mt-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold mb-4">Create New Addon</h2>
        <SimpleInput
          label="Name"
          placeholder="Addon Name"
          {...register("name", { required: true })}
        />
        <SimpleTextArea
          placeholder="Addon Description"
          label="Description"
          {...register("description", { required: true })}
        />
        <button type="submit" className="float-right btn btn-accent btn-soft">
          Add Addon
        </button>
      </form>
    </div>
  );
}
