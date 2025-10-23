import apiClient, { type ApiResponse } from "@/api/apiClient";
import type { HotelInfo } from "@/api/types";
import SimpleCarousel from "@/components/SimpleCarousel";
import SimpleHeader from "@/components/SimpleHeader";
import SimpleLoader from "@/components/SimpleLoader";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";

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
    <div className="container mx-auto p-4">
      <SimpleHeader title={"Hotel Details"}>
        <Link to={`/app/hotel/${id}/edit`} className="btn btn-info">
          Edit
        </Link>
      </SimpleHeader>

      <div className="py-8">
        <h1 className="text-4xl font-extrabold mb-6 text-primary">
          {item.name}
        </h1>
        <div className="carousel w-full rounded-box mb-8 shadow-lg">
          <SimpleCarousel>
            {item.imageUrls.map((image, index) => (
              <div
                key={index}
                className="carousel-item w-full grid place-items-center"
              >
                <img
                  src={image.url}
                  className="object-cover h-[420px] aspect-video rounded-md w-full"
                  alt={item.name}
                />
              </div>
            ))}
          </SimpleCarousel>
        </div>

        <p className="text-lg mb-8 leading-relaxed text-base-content">
          {item.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4 p-6 bg-base-200 rounded-box shadow-md">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-secondary">
                Location
              </h2>
              <p className="text-base-content">
                {item.address}, {item.city}, {item.state}, {item.country}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2 text-secondary">Rating</h2>
              <div className="rating">
                {/*{[...Array(5)].map((_, i) => (
                  <input
                    key={i}
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-accent"
                    checked={i + 1 === item.rating}
                    readOnly
                  />
                ))}*/}
              </div>
              <p className="text-base-content mt-2">{item.rating}/5</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2 text-secondary">
                Availability
              </h2>
              <span
                className={`badge ${item.isAvailable ? "badge-success" : "badge-error"} badge-lg`}
              >
                {item.isAvailable ? "Available" : "Not Available"}
              </span>
            </div>
          </div>
          <div className="p-6 bg-base-200 rounded-box shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-secondary">
              Amenities
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {item.amenities.map((amenity) => (
                <li
                  key={amenity.id}
                  className="flex items-center gap-3 p-2 bg-base-100 rounded-lg shadow-sm"
                >
                  <div className="size-10 bg-white rounded-full p-2 flex items-center justify-center shadow-inner">
                    <img
                      src={amenity.icon}
                      alt={amenity.name}
                      className="w-6 h-6"
                    />
                  </div>
                  <span className="text-base-content font-medium">
                    {amenity.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-primary">Rooms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {item.rooms.map((room) => (
            <div
              key={room.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <figure className="relative h-56">
                <img
                  src={
                    room.imageUrls[0]?.url || "https://picsum.photos/400/225"
                  }
                  alt={room.name}
                  className="w-full h-full object-cover rounded-t-box"
                />
                <div className="badge badge-lg badge-primary absolute top-4 right-4">
                  ${room.pricePerNight} / night
                </div>
              </figure>
              <div className="card-body p-6">
                <h3 className="card-title text-xl font-bold text-primary">
                  {room.name}
                </h3>
                <p className="text-base-content text-sm mb-3">
                  {room.description}
                </p>
                <div className="flex justify-between items-center text-sm mb-3">
                  <p className="font-semibold">
                    Capacity:{" "}
                    <span className="font-normal">{room.capacity}</span>
                  </p>
                  <p className="font-semibold">
                    Available:{" "}
                    <span
                      className={`font-normal ${room.isAvailable ? "text-success" : "text-error"}`}
                    >
                      {room.isAvailable ? "Yes" : "No"}
                    </span>
                  </p>
                </div>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary btn-sm">Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
