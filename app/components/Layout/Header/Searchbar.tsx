import { MdOutlineSearch } from "react-icons/md";
import { useLocation, useSearchParams } from "react-router";
import { useDebounce } from "~/hooks/useDebounce";
const DELAY = 300;
const SEARCH_ROUTES = ["/", "/favorites"];

export function Searchbar() {
  const debounce = useDebounce();
  const [_, setSearchParams] = useSearchParams();
  const location = useLocation();
  const path =
    SEARCH_ROUTES.find((route) => route === location.pathname) || "/";
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const searchTerm = e.target.value;
    debounce(() => {
      setSearchParams({ q: searchTerm, page: "0" });
    }, DELAY);
  }
  return (
    <form action={path} className="w-full">
      <div className="flex gap-1 items-center p-1 rounded-full border border-gray-400 focus-within:border-white text-white w-full">
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
