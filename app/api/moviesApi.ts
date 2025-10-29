import type { Movie } from "~/types/Movie";

const BASE_URL = "http://localhost:3004";
const DEFAULT_MESSAGE = "Something went wrong";
const limit = 5;

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

export async function getFavorites(page: number = 0, q: string = "") {
  const end = limit + page * limit;
  const response = await fetch(
    `${BASE_URL}/movies?isFavorite=true&title_like=${q}&_start=0&_end=${end}`
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

export async function getMovieById(id: string) {
  const response = await fetch(`${BASE_URL}/movies/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  return await response.json();
}
export async function toggleFavorites(id: string, isFavorite: boolean) {
  try {
    await fetch(`${BASE_URL}/movies/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isFavorite }),
    });
  } catch (error) {}
}

export async function createMovie(data: Omit<Movie, "id">) {
  try {
    await fetch(`${BASE_URL}/movies/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {}
}
export async function editMovie(id: string, data: Partial<Movie>) {
  try {
    await fetch(`${BASE_URL}/movies/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    });
  } catch (error) {}
}
export async function deleteMovie(id: string) {
  try {
    await fetch(`${BASE_URL}/movies/${id}`, {
      method: "DELETE",
    });
  } catch (error) {}
}
