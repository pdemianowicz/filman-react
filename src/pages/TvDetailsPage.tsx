import useMediaDetails from "../hooks/useMediaDetails";
import { getImageUrl } from "../api/tmdb";

export default function TvDetailsPage() {
  const { data, loading, error } = useMediaDetails("tv");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return <div>No data found.</div>;

  console.log(data);

  const title = data.title;
  const overview = data.overview;
  const year = data.release_date;
  const posterUrl = data.poster_path;
  const voteAverage = data.vote_average.toFixed(1);

  console.log(data);

  return (
    <div className="flex gap-4">
      <img src={getImageUrl(posterUrl, "w500")} alt={title} />
      <div>
        <h1 className="text-2xl font-semibold text-text-primary">{title}</h1>
        <div className="mb-4 text-text-secondary text-xs font-medium flex gap-2">
          <span className="">{year}</span>
          <span className="">🔸 {voteAverage}</span>
        </div>
        <p className="text-text-secondary">{overview}</p>
      </div>
    </div>
  );
}
