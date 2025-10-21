import type { FoodProps } from "@/api/types";
import { Link } from "@tanstack/react-router";

export default function FoodCard({ item }: { item: FoodProps }) {
  return (
    <div
      key={item.id}
      className="card card-compact bg-base-100 shadow-xl card-border"
    >
      <figure>
        <img
          src={item.imageUrls[0]?.url || "https://picsum.photos/400/225"}
          loading="lazy"
          alt={item.name}
          className="w-full h-32 object-cover"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-lg">{item.name}</h2>
        <p className="text-sm line-clamp-2 text-base-content/80">
          {item.description}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-extrabold text-primary">
            ${item.price}
          </span>
          <span
            className={`badge ${item.isAvailable ? "badge-success" : "badge-error"} badge-outline`}
          >
            {item.isAvailable ? "Available" : "Unavailable"}
          </span>
        </div>
        <div className="card-actions justify-end mt-4">
          <Link
            to="/app/food/$id"
            params={{ id: item.id }}
            className="btn btn-primary btn-sm btn-block"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
