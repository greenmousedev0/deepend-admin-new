import type { Hotel } from "@/api/types";
import { Users, DollarSign, CheckCircle, XCircle } from "lucide-react";

export default function HotelRooms({ item }: { item: Hotel["rooms"] }) {
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {item.map((room) => (
          <div key={room.id} className=" bg-base-100 shadow-xl overflow-hidden">
            <figure className="h-48 w-full rounded-md">
              <img
                src={"https://picsum.photos/400/225"}
                alt={room.name}
                className="w-full h-full object-cover rounded-t-md"
              />
            </figure>
            <div className="  p-4">
              <h3 className=" text-lg font-bold mb-2">{room.name}</h3>
              <p className="text-base-content  text-xs text-opacity-80 mb-4 flex-grow">
                {room.description}
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <p>
                    Price per night:{" "}
                    <span className="font-semibold">${room.pricePerNight}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-info" />
                  <p>
                    Capacity:{" "}
                    <span className="font-semibold">{room.capacity}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {room.isAvailable ? (
                    <CheckCircle className="w-5 h-5 text-success" />
                  ) : (
                    <XCircle className="w-5 h-5 text-error" />
                  )}
                  <p>
                    Available:{" "}
                    <span className="font-semibold">
                      {room.isAvailable ? "Yes" : "No"}
                    </span>
                  </p>
                </div>
              </div>
              <div className="card-actions justify-end mt-6">
                <button className="btn btn-primary btn-block">Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
