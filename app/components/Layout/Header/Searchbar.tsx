import { MdOutlineSearch } from "react-icons/md";
import { useSearchParams } from "react-router";
import { getMovies } from "~/api/moviesApi";
import { useDebounce } from "~/hooks/useDebounce";
const DELAY = 300;
export function Searchbar() {
  const debounce = useDebounce();
  const [_, setSearchParams] = useSearchParams();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const searchTerm = e.target.value;
    debounce(
      () => {
        setSearchParams({ q: searchTerm, page: "1" });
      },
      DELAY,
    );
  }
  return (
    <form action="/">
      <div className="flex gap-1 items-center p-1 rounded-full border border-gray-400 focus-within:border-white text-white w-[150px]">
        <MdOutlineSearch className="text-2xl" />
        <input
          type="search"
          name="q"
          placeholder="Search"
          className="bg-transparent focus:outline-none focus:border-none w-full text-sm md:text-[1rem]"
          onChange={handleChange}
        />
      </div>
    </form>
  );
}
