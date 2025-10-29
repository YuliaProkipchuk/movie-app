import type { Movie } from "~/types/Movie";

const BASE_URL = "http://localhost:3004";
const LIMIT = 10;

export async function getMovies(page: number = 0, q: string = "") {
  const end = LIMIT + page * LIMIT;
  const response = await fetch(
    `${BASE_URL}/movies?title_like=${q}&_start=0&_end=${end}`
  );
  if (!response.ok) {
    throw new Response("Failed to get movies", { status: response.status });
  }
  const data = await response.json();
  const totalCount = response.headers.get("X-Total-Count");
  const total = totalCount ? +totalCount : 0;
  const next = (page + 1) * LIMIT < total;
  return {
    total,
    next,
    movies: data as Movie[],
  };
}

export async function getFavorites(page: number = 0, q: string = "") {
  const end = LIMIT + page * LIMIT;
  const response = await fetch(
    `${BASE_URL}/movies?isFavorite=true&title_like=${q}&_start=0&_end=${end}`
  );
  if (!response.ok) {
    throw new Response("Failed to get favorites", { status: response.status });
  }
  const data = await response.json();
  const totalCount = response.headers.get("X-Total-Count");
  const total = totalCount ? parseInt(totalCount) : 0;
  const next = (page + 1) * LIMIT < total;
  return {
    total,
    next,
    movies: data as Movie[],
  };
}

export async function getMovieById(id: string) {
  const response = await fetch(`${BASE_URL}/movies/${id}`);
  if (response.status === 404) {
    throw new Response("Movie not found", { status: 404 });
  }

  if (!response.ok) {
    throw new Response("Failed to load movie", { status: response.status });
  }

  return response.json();
}
export async function toggleFavorites(id: string, isFavorite: boolean) {
  const response = await fetch(`${BASE_URL}/movies/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isFavorite }),
  });
  if (!response.ok) {
    throw new Response("Failed to toggle favorite", {
      status: response.status,
    });
  }
  return response.json();
}

export async function createMovie(data: Omit<Movie, "id">) {
  const response = await fetch(`${BASE_URL}/movies/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Response("Failed to create movie", {
      status: response.status,
    });
  }
  return response.json();
}
export async function editMovie(id: string, data: Partial<Movie>) {
  const response = await fetch(`${BASE_URL}/movies/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...data }),
  });
  if (!response.ok) {
    throw new Response("Failed to edit favorite", { status: response.status });
  }
  return response.json();
}
export async function deleteMovie(id: string) {
  const response = await fetch(`${BASE_URL}/movies/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Response("Failed to delete movie", { status: response.status });
  }
  return response.json();
}
