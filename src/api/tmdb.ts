const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

type FetchOptions = {
  query?: string;
  page?: number;
  [key: string]: any;
};

export async function tmdbFetch(endpoint: string, options: FetchOptions = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append("api_key", API_KEY);
  url.searchParams.append("language", "en-US");

  if (options.query) url.searchParams.set("query", options.query);
  if (options.page) url.searchParams.set("page", options.page.toString());

  for (const key in options) {
    if (key !== "query" && key !== "page") {
      url.searchParams.set(key, options[key]);
    }
  }

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`TMDb error: ${res.status}`);
  return res.json();
}

export function getImageUrl(path: string | undefined, size: string = "w500") {
  return `${IMAGE_BASE_URL}/${size}${path}`;
}
