import apiClient, { type ApiResponse } from "@/api/apiClient";
import type { Cinema } from "@/api/types";
import FieldSet from "@/components/FieldSet";
import SimpleHeader from "@/components/SimpleHeader";
import PageLoader from "@/components/skeleton/PageLoader";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import Halls from "../_components/Halls";

export default function index() {
  const { id } = useParams({
    from: "/app/cinema/$id",
  });
  const query = useQuery<ApiResponse<Cinema[]>>({
    queryKey: ["cinema-details", id],
    queryFn: async () => (await apiClient.get("admins/cinemas/" + id)).data,
  });

  if (query.isLoading) {
    return <PageLoader title="Cinema Details" />;
  }
  const item = query.data?.payload[0];

  return (
    <>
      <SimpleHeader title="Cinema Details" />
      <div className="p-4 space-y-4">
        <h2 className="text-2xl">{item.name}</h2>
        <FieldSet title="Location">
          <div className="">
            <label htmlFor="" className="fieldset-label">
              Address
            </label>
            <p>
              {item.address}
              {/*{item.city}
              {item.state}
              {item.countryId}*/}
            </p>
          </div>
        </FieldSet>
        <div className="">
          <Halls cinemaID={id} />
        </div>
      </div>
    </>
  );
}
