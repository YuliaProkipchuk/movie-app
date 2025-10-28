import { useState } from "react";
import { toggleFavorites } from "~/api/moviesApi";

export function useToggleFavorite(id: string, status: boolean) {
  const [isFavorite, setIsFavorite] = useState(status);

  async function handleToggle() {
    setIsFavorite(!isFavorite);
    try {
      await toggleFavorites(id, !isFavorite);
    } catch (error) {
      setIsFavorite(isFavorite);
    }
  }

  return { isFavorite, handleToggle };
}
