import type { MovieCinema } from "@/api/types";

export default function MovieCard({ item }: { item: MovieCinema }) {
  return (
    <div className="card bg-base-100 shadow-xl h-full flex flex-col">
      <figure className="relative w-full h-64 overflow-hidden">
        <img
          src={item.posterUrl}
          alt={item.title}
          className="object-cover w-full h-full"
        />
      </figure>
      <div className="card-body flex flex-col justify-between flex-grow">
        <h2 className="card-title text-lg font-bold">
          {item.title}
          <div className="badge badge-secondary">{item.ageRating}+</div>
        </h2>
        <p className="text-sm text-base-content flex-grow line-clamp-3">
          {item.description}
        </p>
        <div className="card-actions justify-end mt-4 flex-wrap">
          {item.genres.map((genre) => (
            <div key={genre.id} className="badge badge-outline badge-sm">
              {genre.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
