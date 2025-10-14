import type { JwtUser } from "../../../redux/AuthSlice";
import { SearchBar } from "./search_bar";





interface NavbarCenterProps {
  user: JwtUser | null;
}

export function NavbarCenter({ user }: NavbarCenterProps) {

  return (
    <div className="w-1/2">
      {user && <SearchBar />}
    </div>
  );
}
