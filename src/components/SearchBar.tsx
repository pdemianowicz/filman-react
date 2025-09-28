import { useEffect, useState } from "react";
import SerchIcon from "../assets/svg/icon-search.svg?react";
import { tmdbFetch, getImageUrl } from "../api/tmdb";
import useDebounce from "../hooks/useDebounce";
// import { useNavigate } from "react-router-dom";

interface SearchResult {
  id: number;
  title?: string;
  name?: string;
  media_type: "movie" | "tv" | "person";
  poster_path?: string;
  profile_path?: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debounceSearch = useDebounce(query, 800);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsOpen(true);
    }

    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (debounceSearch.length < 3) {
      setResults([]);
      setIsOpen(false);
      setLoading(false);
      return;
    }

    setLoading(true);

    tmdbFetch("/search/multi", {
      query: debounceSearch,
      page: 1,
      include_adult: false,
    })
      .then((data) => {
        const filtered = (data.results || []).filter(
          (item: SearchResult) =>
            (item.media_type === "movie" && item.poster_path) ||
            (item.media_type === "tv" && item.poster_path) ||
            (item.media_type === "person" && item.profile_path)
        );
        setResults(filtered);
        setIsOpen(true);
      })
      .catch((err) => {
        setError("Search failed. Try again.");
        setResults([]);
        setIsOpen(false);
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [debounceSearch]);

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    setError("");
  };

  console.log(results);

  return (
    <div className="relative z-10">
      <div className="flex items-center mb-4">
        <SerchIcon className="w-6 h-6 md:w-8 md:h-8 text-text-primary" />
        <div className="flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for movies or TV series..."
            className="w-full px-4 py-3 pr-12 outline-none text-text-primary placeholder-text-secondary text-xl md:text-2xl"
          />

          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-600 border-r-accent"></div>
            </div>
          )}

          {query && !loading && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-accent transition-colors text-lg cursor-pointer">
              ✕
            </button>
          )}
        </div>
      </div>

      {error && !loading && (
        <div className="absolute top-full left-0 right-0 bg-surface rounded-md shadow-lg p-4">
          <p className="text-red-400 text-center">{error}</p>
        </div>
      )}

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-surface rounded-md shadow-lg max-h-80 overflow-y-auto">
          {results.map((item) => (
            <div key={item.id} className="flex items-center gap-4 px-4 py-2 hover:bg-accent/20 cursor-pointer">
              <img
                src={getImageUrl(item.poster_path || item.profile_path, "w92")}
                alt={item.title || item.name}
                className="w-12 h-16 object-cover rounded-md"
              />
              <span>{item.title || item.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
