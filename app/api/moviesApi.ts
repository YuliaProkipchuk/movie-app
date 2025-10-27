import type { Movie } from "~/types/Movie";

const BASE_URL = "http://localhost:3004";
const DEFAULT_MESSAGE = "Something went wrong";
const limit = 3;

export async function getMovies(page: number = 0, q: string = "") {
  const end = limit + page * limit;
  const response = await fetch(
    `${BASE_URL}/movies?title_like=${q}&_start=0&_end=${end}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  const data = await response.json();
  const totalCount = response.headers.get("X-Total-Count");
  const total = totalCount ? parseInt(totalCount) : 0;
  const next = (page + 1) * limit < total;
  return {
    total,
    next,
    movies: data as Movie[],
  };
}
