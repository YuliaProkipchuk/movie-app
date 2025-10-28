import { useSearchParams } from "react-router";

export function useLoadMore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || 0;

  function loadMore() {
    setSearchParams(
      {
        q: searchParams.get("q") || "",
        page: (+currentPage + 1).toString(),
      },
      { preventScrollReset: true }
    );
  }

  return { loadMore };
}
