import apiClient, { type ApiResponse } from "@/api/apiClient";
import type { DeliverySettings } from "@/api/types";
import SuspensePageLayout from "@/components/layout/SuspensePageLayout";
import SimpleInput from "@/components/SimpleInput";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function index() {
  const query = useQuery<ApiResponse<DeliverySettings>>({
    queryKey: ["delivery-settings"],
    queryFn: async () => {
      const response = await apiClient.get("admins/delivery-settings");
      return response.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: Partial<DeliverySettings>) => {
      const response = await apiClient.post("admins/delivery-settings", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Delivery settings updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update delivery settings.");
    },
  });
  const nav = useNavigate();
  const form = useForm<Partial<DeliverySettings>>();
  const onSubmit = (data: Partial<DeliverySettings>) => {
    toast.promise(mutation.mutateAsync(data), {
      loading: "Updating delivery settings...",
      success: "Delivery settings updated successfully!",
      error: "Failed to update delivery settings.",
    });
  };
  return (
    <SuspensePageLayout query={query}>
      {(data) => {
        if (data) {
          toast.info("delivery settings exist: redirecting");
          nav({
            to: "/app/settings/delivery",
          });
        }
        return (
          <>
            <form
              onSubmit={form.handleSubmit((data) => {
                onSubmit(data);
              })}
            >
              <div className="mb-4">
                <SimpleInput
                  label="Origin Latitude"
                  {...form.register("originLat", { required: true })}
                />
              </div>
              <div className="mb-4">
                <SimpleInput
                  label="Origin Longitude"
                  {...form.register("originLng", { required: true })}
                />
              </div>
              <div className="mb-4">
                <SimpleInput
                  label="Price Per Km"
                  {...form.register("pricePerKm", { required: true })}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Saving..." : "Save"}
              </button>
            </form>
          </>
        );
      }}
    </SuspensePageLayout>
  );
}
