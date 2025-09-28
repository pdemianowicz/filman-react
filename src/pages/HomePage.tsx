import { useEffect, useState } from "react";
import ContentSection from "../components/ContentSection";
import { tmdbFetch } from "../api/tmdb";

export default function HomePage() {
  const [trending, setTrending] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAllData() {
      try {
        setLoading(true);
        setError("");
        const [trendingData, popularMoviesData, popularTVData, upcomingData] = await Promise.all([
          tmdbFetch("/trending/all/week"),
          tmdbFetch("/movie/popular"),
          tmdbFetch("/tv/popular"),
          tmdbFetch("/movie/upcoming"),
        ]);

        setTrending(trendingData.results || []);
        setPopularMovies(popularMoviesData.results || []);
        setPopularTV(popularTVData.results || []);
        setUpcoming(upcomingData.results || []);
      } catch (err) {
        console.error("Error fetching homepage data:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchAllData();
  }, []);

  return (
    <div className="space-y-16">
      <ContentSection title="Trending This Week" items={trending} />
      <ContentSection title="Popular Movies" items={popularMovies} />
      <ContentSection title="Popular TV Shows" items={popularTV} />
      <ContentSection title="Upcoming Movies" items={upcoming} />
    </div>
  );
}
