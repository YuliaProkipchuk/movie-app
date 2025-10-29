import { editMovie, getMovieById } from "~/api/moviesApi";
import type { Route } from "./+types/$id.edit";
import type { Movie } from "~/types/Movie";
import MovieForm from "~/components/MovieForm/MovieForm";
import { validateForm } from "~/utils/validateForm";
import type { FormErrors } from "~/types/Errors";
import { redirect } from "react-router";

export function meta({ loaderData }: Route.MetaArgs) {
  return [
    { title: loaderData.title },
    { name: "description", content: "Update movie info" },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  try {
    const data = (await request.json()) as Movie;

    const errors = await validateForm(data);
    if (Object.keys(errors).length !== 0) {
      return errors as FormErrors;
    }

    await editMovie(data.id, data);

    return redirect(`/movies/${data.id}`);
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
export async function loader({ params }: Route.LoaderArgs) {
  return (await getMovieById(params.id)) as Movie;
}
export default function MoviePage({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <main className="w-full px-4">
        <h1 className="text-center py-4 font-bold text-3xl">Edit Movie</h1>

        <MovieForm movie={loaderData} mode="edit" />
      </main>
    </>
  );
}
