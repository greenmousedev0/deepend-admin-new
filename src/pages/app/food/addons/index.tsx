import apiClient, { type ApiResponse } from "@/api/apiClient";
import type { FoodAddon } from "@/api/types";
import Modal from "@/components/dialogs-modals/SimpleModal";
import SimpleHeader from "@/components/SimpleHeader";
import SimpleLoader from "@/components/SimpleLoader";
import SimplePaginator from "@/components/SimplePaginator";
import { extract_message } from "@/helpers/auth";
import { useModal } from "@/store/modals";
import { usePagination } from "@/store/pagination";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function index() {
  const props = usePagination();
  const query = useQuery<ApiResponse<FoodAddon[]>>({
    queryKey: ["foodAddons", props.page],
    queryFn: async () => {
      const response = await apiClient.get("/admins/foods/addons/categories", {
        params: {
          page: props.page,
          limit: 10,
        },
      });
      return response.data;
    },
  });
  if (query.isLoading) {
    return <SimpleLoader />;
  }

  return (
    <div>
      <SimpleHeader title={"Food Addon"}>
        <Link to="/app/food/addons/new" className="btn btn-primary">
          Add New Addon
        </Link>
      </SimpleHeader>
      <div className="">
        {query.data?.payload.map((addon, index) => (
          <AddonCard
            refetch={query.refetch}
            addon={addon}
            index={index}
            key={addon.id}
          />
        ))}
      </div>
      <div className="mt-2">
        <SimplePaginator {...props} />
      </div>
    </div>
  );
}

const AddonCard = ({
  addon,
  index,
  refetch,
}: {
  addon: FoodAddon;
  index: number;
  refetch: () => void;
}) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      let resp = await apiClient.delete(
        "admins/foods/addons/categories/" + addon.id,
      );
      return resp.data;
    },
    onSuccess: () => {
      refetch();
    },
  });
  const onClick = () =>
    toast.promise(mutateAsync, {
      loading: "Deleting..." + addon.name,
      success: extract_message,
      error: extract_message,
    });
  return (
    <div
      key={addon.id}
      className="card card-compact bg-base-100 shadow-xl mb-4"
    >
      <div className="card-body">
        <h2 className="card-title">
          {index + 1}. {addon.name}
        </h2>
        <p>{addon.description}</p>
        <div className="ml-auto">
          <button
            className="btn btn-error"
            onClick={onClick}
            disabled={isPending}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
