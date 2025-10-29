import { useState } from "react";
import { editMovie } from "~/api/moviesApi";

export function useRating(defaultValue: number) {
  const [rating, setRating] = useState(defaultValue);

  async function rateMovie(id: string, newRating: number) {
    try {
      setRating(newRating);
      await editMovie(id, { rating: newRating });
    } catch (error) {
      setRating(defaultValue);
    }
  }

  return { rating, rateMovie };
}
