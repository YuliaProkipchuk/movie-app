import { createMovie } from "~/api/moviesApi";
import type { Route } from "./+types/home";
import { redirect } from "react-router";
import type { Movie } from "~/types/Movie";
import { validateForm } from "~/utils/validateForm";
import { type FormErrors } from "~/types/Errors";
import MovieForm from "~/components/MovieForm/MovieForm";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New Movie" },
    { name: "description", content: "Add new movie to the list" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  try {
    const data = (await request.json()) as Omit<Movie, "id">;

    const errors = await validateForm(data);
    if (Object.keys(errors).length !== 0) {
      return errors as FormErrors;
    }

    await createMovie(data);

    return redirect("/");
  } catch (error) {
    if (error instanceof Error) {
      return {
        general: error.message,
      };
    }
    return {
      general: "Something went wrong",
    };
  }
}
export default function NewMoviePage() {
  return (
    <>
      <main className="w-full px-4">
        <h1 className="text-center py-4 font-bold text-3xl">New Movie</h1>
        <MovieForm movie={null} mode="create" />
      </main>
    </>
  );
}
