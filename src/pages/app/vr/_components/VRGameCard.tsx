import apiClient from "@/api/apiClient";
import type { Vrgame } from "@/api/types";
import { extract_message } from "@/helpers/auth";
import { Link } from "@tanstack/react-router";
import { Delete, Edit, Eye, Menu, Trash } from "lucide-react";
import { toast } from "sonner";

export default function VRGameCard({
  game,
  refetch,
}: {
  game: Vrgame;
  refetch?: () => any;
}) {
  return (
    <>
      <div
        key={game.id}
        className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden border border-base-200"
      >
        <figure className="relative h-56 w-full">
          <img
            src={
              game.imageUrls[0]?.url || "https://picsum.photos/400/200?random=1"
            }
            alt={game.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <div className="badge badge-lg badge-primary rounded-full px-4 py-3 text-sm font-bold shadow-lg">
              {game.ageRating}+
            </div>
            <div
              className={`badge badge-lg rounded-full px-4 py-3 text-sm font-bold shadow-lg ${game.isAvailable ? "badge-success" : "badge-error"}`}
            >
              {game.isAvailable ? "Available" : "Unavailable"}
            </div>
          </div>
        </figure>
        <div className="card-body p-6">
          <h2 className="card-title text-base-content text-xl font-bold mb-2">
            {game.name}
          </h2>
          <p className="text-base-content text-sm line-clamp-3 min-h-[4rem] opacity-90">
            {game.description}
          </p>
          <div className="flex items-center justify-between mt-6">
            <div className="flex flex-wrap gap-3">
              <div className="badge badge-secondary badge-lg rounded-full px-4 py-3 text-sm font-bold">
                ${game.ticketPrice}
              </div>
              <div className="badge badge-accent badge-lg rounded-full px-4 py-3 text-sm font-bold">
                {game.ticketQuantity} Tickets
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <div className="dropdown dropdown-top dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-info btn-circle btn-soft"
                  >
                    <Menu></Menu>
                  </div>
                  <ul
                    tabIndex="-1"
                    className="dropdown-content ring ring-current/20 menu bg-base-100 rounded-box z-90 w-52 p-2 shadow-sm"
                  >
                    <li>
                      <a
                        onClick={() => {
                          toast.promise(
                            async () => {
                              let resp = await apiClient.delete(
                                "admins/vrgames/" + game.id,
                              );
                              refetch();
                              return resp.data;
                            },
                            {
                              loading: "loading",
                              success: extract_message,
                              error: extract_message,
                            },
                          );
                        }}
                      >
                        <Trash size={16} /> Delete
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          toast.promise(
                            async () => {
                              let state = "available";
                              if (game.isAvailable == true) {
                                state = "unavailable";
                              }
                              let resp = await apiClient.put(
                                "admins/vrgames/" + game.id + "/" + state,
                              );
                              refetch();
                              return resp.data;
                            },
                            {
                              loading: "loading",
                              success: extract_message,
                              error: extract_message,
                            },
                          );
                        }}
                      >
                        <Edit size={16} /> Avaliability
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <Link
                to={"/app/vr/games/" + game.id}
                className="btn btn-primary  btn-circle btn-md rounded-full hover:scale-105 transition-transform duration-300"
              >
                <Eye />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
