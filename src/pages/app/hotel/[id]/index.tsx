import apiClient, { type ApiResponse } from "@/api/apiClient";
import type { HotelInfo } from "@/api/types";
import SimpleHeader from "@/components/SimpleHeader";
import SimpleLoader from "@/components/SimpleLoader";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

export default function index() {
  const { id } = useParams({
    from: "/app/hotel/$id",
  });

  const query = useQuery<ApiResponse<HotelInfo>>({
    queryKey: ["hotel", id],
    queryFn: async () => {
      let resp = await apiClient.get("admins/hotels/" + id);
      return resp.data;
    },
  });

  if (query.isLoading) {
    return (
      <>
        <SimpleHeader title={"Hotel Details"} />
        <SimpleLoader />
      </>
    );
  }
  const item = query.data.payload;
  return (
    <div>
      <SimpleHeader title={"Hotel Details"} />

      <div className=" ">
        <h1 className="text-3xl font-bold mb-4">{item.name}</h1>
        <div className="carousel w-full rounded-box mb-4">
          {item.imageUrls.map((image, index) => (
            <div key={index} className="carousel-item w-full">
              <img
                src={image.url}
                className="w-full object-cover h-64"
                alt={item.name}
              />
            </div>
          ))}
        </div>

        <p className="text-lg mb-4">{item.description}</p>

        <div className="grid  grid-cols-1  gap-4 mb-4">
          <div className="space-y-2">
            <div>
              <h2 className="text-xl font-semibold mb-2">Location</h2>
              <p className="">
                {item.address}, {item.city}, {item.state}, {item.country}
              </p>
            </div>
            <div>
              <h2 className="mb-2">Rating: </h2>
              <p className="">{item.rating}/5</p>
            </div>
            <div>
              <h2 className="mb-2">Available: </h2>
              <p className="p">{item.isAvailable ? "Yes" : "No"}</p>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Amenities</h2>
            <ul className="grid  grid-cols-2 md:grid-cols-4 gap-2">
              {item.amenities.map((amenity) => (
                <li key={amenity.id} className="flex items-center gap-2 ">
                  <div className="size-8 bg-white rounded-lg p-2">
                    <img src={amenity.icon} alt="" />
                  </div>
                  {amenity.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-2">Rooms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {item.rooms.map((room) => (
            <div key={room.id} className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  src={
                    room.imageUrls[0]?.url || "https://picsum.photos/400/225"
                  }
                  alt={room.name}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{room.name}</h3>
                <p>{room.description}</p>
                <p>Price per night: ${room.pricePerNight}</p>
                <p>Capacity: {room.capacity}</p>
                <p>Available: {room.isAvailable ? "Yes" : "No"}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
