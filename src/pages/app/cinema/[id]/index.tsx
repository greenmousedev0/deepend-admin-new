import apiClient, { type ApiResponse } from "@/api/apiClient";
import type { Cinema } from "@/api/types";
import FieldSet from "@/components/FieldSet";
import SimpleHeader from "@/components/SimpleHeader";
import PageLoader from "@/components/skeleton/PageLoader";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import Halls from "../_components/Halls";
import { VideoIcon } from "lucide-react";
import { useModal } from "@/store/modals";
import Modal from "@/components/dialogs-modals/SimpleModal";
import SimpleInput from "@/components/SimpleInput";

export default function index() {
  const { id } = useParams({
    from: "/app/cinema/$id",
  });
  const query = useQuery<ApiResponse<Cinema[]>>({
    queryKey: ["cinema-details", id],
    queryFn: async () => {
      let resp = await apiClient.get("admins/cinemas/" + id);
      return resp.data;
    },
  });

  if (query.isLoading) {
    return <PageLoader title="Cinema Details" />;
  }
  const item = query.data?.payload[0];

  return (
    <>
      <SimpleHeader title="Cinema Details" />
      <div className="p-4 space-y-4">
        <h2 className="text-2xl flex gap-2 items-center">
          <VideoIcon size={32}></VideoIcon>
          <span>{item.name}</span>
        </h2>
        <FieldSet title="Location">
          <div className="">
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
