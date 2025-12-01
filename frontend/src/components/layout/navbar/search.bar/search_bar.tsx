import { useEffect, useMemo, useState } from "react";
import { BiLoaderAlt, BiSearch, BiX } from "react-icons/bi";
import type { UserDTO } from "../../../../dtos/models_dtos/user_dto";
import { useBodyScrollLock } from "../../../../util/helper_hooks";
import { Drawer } from "../../../elements/drawer";
import throttle from "lodash/throttle";
import debounce from "lodash/debounce";
import './search_bar.css';
import { values } from "lodash";
import userService from "../../../../service/user_service";
import { toast } from "react-toastify";
import { SearchBarResults } from "./searchbar.results";


interface SearchBarProps {
  open: boolean;
  onClose: () => void;
}

export function SearchBar({ open, onClose }: SearchBarProps) {

  const [query, setQuery] = useState<string>('');
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);


  const debouncedSearch = useMemo(() =>
    debounce((value: string) => {
      const trimmed = value.toLowerCase();
      setLoading(true)
      toast.success("api called: " + value)
      userService.searchUsers(trimmed)
        .then(res => {
          setUsers(res.content)
        })
        .catch(err => toast.error(err.response.data))
        .finally(() => setLoading(false))
        ;
    }, 500), []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  }

  const clearQuery = () => {
    setQuery('');
    setUsers([]);
    setLoading(false);
    debouncedSearch.cancel();
  };


  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  useBodyScrollLock(open);

  return (
    <Drawer>
      {/* Backdrop Wrapper */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-30 min-h-screen
         bg-black/80 
          transition-opacity duration-200
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        aria-hidden="true"
      />

      {/* search bar */}
      <div
        className={`search-bar
          fixed top-0 left-0 w-full h-50 flex flex-col items-center justify-start p-5  
          z-40
          bg-gradient-to-br from-indigo-100  to-indigo-100 dark:from-slate-800 dark:to-slate-900 backdrop-blur border-b border-white/10
          transition-transform duration-300 ease-out will-change-transform
        `}
        role="dialog"
        aria-modal="true"
      >
        {/* Input bar */}

        <div className="w-9/10 flex justify-between items-center gap-2 relative">

          <div></div>

          <div className="relative w-4/10">
            {/* Search / Loader Icon */}
            {loading ? (
              <BiLoaderAlt
                size={22}
                className="animate-spin absolute left-3 top-1/2 -translate-y-1/2 text-black dark:text-slate-400"
              />
            ) : (
              <BiSearch
                size={22}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-black dark:text-slate-400"
              />
            )}

            <input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Search users..."
              className="block dark:text-white w-full rounded-lg dark:bg-slate-800 dark:hover:bg-slate-900 border border-black dark:border-white py-4 pl-11 pr-10 
      placeholder:text-black dark:placeholder:text-slate-500 focus:outline-none"
            />

            {query.length > 0 && (
              <button
                onClick={clearQuery}
                className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 dark:text-white"
              >
                <BiX size={22} />
              </button>
            )}

            {users.length > 0 && <SearchBarResults users={users} />}

          </div>


          <button onClick={onClose}><BiX size={40} className="cursor-pointer dark:text-white" /></button>

        </div>

      </div>
    </Drawer>
  );
}
