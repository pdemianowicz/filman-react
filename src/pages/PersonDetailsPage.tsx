import useMediaDetails from "../hooks/useMediaDetails";
import { getImageUrl } from "../api/tmdb";

export default function PersonDetailsPage() {
  const { data, loading, error } = useMediaDetails("person");

  console.log(data);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return <div>No data found.</div>;

  return (
    <div className="flex gap-4">
      <img src={getImageUrl(data.profile_path, "w500")} alt={data.name} />
      <div>
        <h1 className="text-2xl font-semibold text-text-primary">{data.name}</h1>
      </div>
    </div>
  );
}
