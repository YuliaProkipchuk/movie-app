import { Link } from "react-router";
import { MdFavorite, MdOutlineAdd } from "react-icons/md";
import { Searchbar } from "./Searchbar";

export function Header() {
  return (
    <header className="h-20 px-4 py-2 flex justify-between items-center backdrop-blur-2xl sticky top-0 left-0 z-50 w-full">
      <Link to={"/"}>M</Link>

      <nav>
        <ul className="flex gap-5 items-center">
          <li>
            <Searchbar />
          </li>
          <li>
            <Link to={"/"}>
              <MdFavorite className="text-2xl cursor-pointer hover:text-pink-400" />
            </Link>
          </li>
          <li>
            <Link to={"/"}>
              <MdOutlineAdd className="text-2xl cursor-pointer hover:text-pink-400" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
