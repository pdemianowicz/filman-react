import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getPersonDetails, getTvDetails } from "../api/tmdb";

interface MovieDetails {
  title: string;
  backdrop_path: string;
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  origin_country: string[];
  orginal_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: { id: number; logo_path: string; name: string; origin_country: string }[];
  production_countries: { iso_3166_1: string; name: string }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  name?: string;
  profile_path?: string;
}

export default function useMediaDetails(mediaType: "movie" | "tv" | "person") {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchMediaDetails = async () => {
      try {
        let data;
        if (mediaType === "movie") {
          data = await getMovieDetails(Number(id));
        } else if (mediaType === "tv") {
          data = await getTvDetails(Number(id));
        } else if (mediaType === "person") {
          data = await getPersonDetails(Number(id));
        }
        setData(data);
      } catch (err) {
        console.log("Error fetching details:", err);
        setError("Failed to load details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMediaDetails();
  }, [mediaType, id]);

  return { data, loading, error };
}
