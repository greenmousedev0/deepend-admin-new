import apiClient, { type ApiResponse } from "@/api/apiClient";
import type { AdvertBanner } from "@/api/types";
import SuspensePageLayout from "@/components/layout/SuspensePageLayout";
import SimpleCarousel from "@/components/SimpleCarousel";
import SimplePaginator from "@/components/SimplePaginator";
import { extract_message } from "@/helpers/auth";
import { usePagination } from "@/store/pagination";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export default function index() {
  const props = usePagination();
  const query = useQuery<ApiResponse<AdvertBanner[]>>({
    queryKey: ["advert-banners", props.page],
    queryFn: async () => {
      let resp = await apiClient.get("admins/advert-banners", {
        params: {
          page: props.page,
          limit: 10,
        },
      });
      return resp.data;
    },
  });
  return (
    <SuspensePageLayout query={query} title={"Advert Banners"}>
      {(response: ApiResponse<AdvertBanner[]>) => {
        const banners = response.payload || [];
        return (
          <div className="container mx-auto p-4">
            {banners.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {banners.map((banner) => (
                  //@ts-expect-error
                  <Banner {...banner} refetch={query.refetch} />
                ))}
              </div>
            ) : (
              <p className="text-center text-lg">No advert banners found.</p>
            )}
            <div className="mt-8">
              <SimplePaginator {...props}></SimplePaginator>
            </div>
          </div>
        );
      }}
    </SuspensePageLayout>
  );
}
function Banner(banner: AdvertBanner) {
  const mutation = useMutation({
    mutationFn: async (fn: any) => await fn(),
  });
  const delete_item = async () => {
    let resp = await apiClient.delete(`admins/advert-banners/${banner.id}`);
    //@ts-ignore
    banner.refetch();
    return resp.data;
  };
  const change_status = async () => {
    const new_status = banner.isPublished ? "unpublish" : "publish";
    let resp = await apiClient.put(
      `admins/advert-banners/${banner.id}/` + new_status,
    );
    //@ts-ignore
    banner.refetch();
    return resp.data;
  };
  return (
    <div key={banner.id} className="card bg-base-100 shadow-xl">
      {banner.imageUrls && banner.imageUrls.length > 0 && (
        <SimpleCarousel>
          {banner.imageUrls.map((url) => (
            <img
              loading="lazy"
              key={url.url + "item"}
              src={url.url}
              alt={banner.name}
              className="w-full h-[220px] object-cover"
            />
          ))}
        </SimpleCarousel>
      )}
      <div className="card-body">
        <h2 className="card-title">{banner.name}</h2>
        <p>
          Status:{" "}
          <span
            className={`badge ${
              banner.isPublished ? "badge-success" : "badge-warning"
            }`}
          >
            {banner.isPublished ? "Published" : "Not Published"}
          </span>
        </p>
        <div className="card-actions justify-end">
          <div className="dropdown dropdown-end dropdown-top">
            <button
              disabled={mutation.isPending}
              tabIndex={0}
              role="button"
              className="btn btn-primary btn-sm"
            >
              Actions
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content ring ring-current/20 z-[1] menu p-2 shadow-xl bg-base-100 rounded-box w-52"
            >
              <li
                onClick={() => {
                  toast.promise(mutation.mutateAsync(change_status), {
                    loading: "Changing...",
                    success: extract_message,
                    error: extract_message,
                  });
                }}
              >
                <a>{banner.isPublished ? "Unpublish" : "Publish"}</a>
              </li>
              <li
                onClick={() => {
                  toast.info("Work In Progress");
                }}
              >
                <a>Edit</a>
              </li>
              <li
                onClick={() => {
                  toast.promise(delete_item, {
                    loading: "Deleting...",
                    success: "Deleted!",
                    error: extract_message,
                  });
                }}
              >
                <a>Delete</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
