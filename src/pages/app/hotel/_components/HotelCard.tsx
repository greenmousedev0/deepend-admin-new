import type { Hotel } from "@/api/types";
import SimpleCarousel from "@/components/SimpleCarousel";
import { Link } from "@tanstack/react-router";

export default function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <div key={hotel.id} className="card  bg-base-100 shadow-xl">
      <div className="h-[400px]">
        {hotel.imageUrls && hotel.imageUrls.length > 0 && (
          <div className=" w-full h-[400px]  bg-base-300 grid place-items-center">
            <img
              src={hotel.imageUrls[0].url}
              alt={`Image of ${hotel.name}`}
              className="w-[500px] h-[400px] object-cover"
            />
          </div>
        )}
      </div>
      <div className="card-body">
        <h2 className="card-title">{hotel.name}</h2>
        <p className="text-sm text-base-content/80">{hotel.description}</p>
        <div className="flex flex-col md:flex-row md:justify-between text-sm mt-2">
          <p>
            <strong>Address:</strong> {hotel.address}, {hotel.city},{" "}
            {hotel.state}, {hotel.country}
          </p>
          <p>
            <strong>Rating:</strong> {hotel.rating} / 5
          </p>
          <p>
            <strong>Available:</strong>{" "}
            <span
              className={`badge ${
                hotel.isAvailable ? "badge-success" : "badge-error"
              } badge-sm`}
            >
              {hotel.isAvailable ? "Yes" : "No"}
            </span>
          </p>
        </div>
        {hotel.amenities && hotel.amenities.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Amenities:</h3>
            <div className="flex flex-wrap gap-2">
              {hotel.amenities.map((amenity) => (
                <div key={amenity.id} className="badge badge-accent">
                  {amenity.name}
                </div>
              ))}
            </div>
          </div>
        )}
        {hotel.rooms && hotel.rooms.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">
              Rooms: {hotel.rooms.length}
            </h3>
            <div className="">
              <SimpleCarousel>
                {hotel.rooms.map((room) => (
                  <div
                    key={room.id}
                    className="card m-2  card-compact bg-base-200 shadow"
                  >
                    <div className="card-body">
                      <h4 className="card-title text-base">{room.name}</h4>
                      <p className="text-xs">{room.description}</p>
                      <p className="text-sm">
                        <strong>Price per Night:</strong> ${room.pricePerNight}
                      </p>
                      <p className="text-sm">
                        <strong>Capacity:</strong> {room.capacity}
                      </p>
                      <p className="text-sm">
                        <strong>Available:</strong>{" "}
                        <span
                          className={`badge ${
                            room.isAvailable ? "badge-success" : "badge-error"
                          } badge-sm`}
                        >
                          {room.isAvailable ? "Yes" : "No"}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </SimpleCarousel>
            </div>
          </div>
        )}
        <div className="">
          <Link
            to={`/app/hotel/${hotel.id}`}
            className="btn btn-block btn-primary"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
