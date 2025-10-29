import type { Movie } from "~/types/Movie";

export function getDataForValidation(
  formData: FormData,
  mode: "edit" | "create",
  actors: string[],
  genres: string[],
  rating: number,
  id?: string
): Omit<Movie, "id"> | Movie {
  const data: Omit<Movie, "id"> = {
    title: (formData.get("title") as string) || "",
    image: (formData.get("image") as string) || "",
    description: (formData.get("description") as string) || "-",
    actors,
    genre: genres,
    rating,
    director: (formData.get("director") as string) || "-",
    isFavorite: false,
    release_date:
      (formData.get("release_date") as string) ||
      new Date().toISOString().split("T")[0],
  };

  if (mode === "edit") {
    return {
      ...data,
      id: id as string,
    };
  }

  return data;
}
