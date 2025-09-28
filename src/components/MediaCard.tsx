import { Link } from "react-router-dom";
import { getImageUrl } from "../api/tmdb";

interface MediaCardProps {
  item: any;
  size?: "normal" | "large";
  showInfo?: "minimal" | "full";
}

export default function MediaCard({ item, size = "normal", showInfo = "minimal" }: MediaCardProps) {
  const title = item.title || item.name;
  const mediaType = item.media_type || (item.first_air_date ? "tv" : "movie");
  const year = (item.release_date || item.first_air_date || "").split("-")[0];
  const rating = item.vote_average ? item.vote_average.toFixed(1) : "N/A";

  const cardWidth = size === "large" ? "w-64 md:w-80" : "w-40 md:w-48";

  return (
    <Link to={`/${mediaType}/${item.id}`} className={`group relative block ${cardWidth} flex-shrink-0`}>
      {/* image */}
      <div className="aspect-[2/3] rounded overflow-hidden relative">
        <img
          src={getImageUrl(item.poster_path || item.backdrop_path, "w300")}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* overlay hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300"></div>

        {/* rating badge */}
        <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
          ⭐ {rating}
        </div>
      </div>

      {/* info */}
      <div className="mt-2">
        <p className="text-text-primary font-semibold truncate">{title}</p>
        {showInfo === "full" && (
          <p className="text-xs text-text-secondary">
            {mediaType.toUpperCase()} {year && `• ${year}`}
          </p>
        )}
      </div>
    </Link>
  );
}
