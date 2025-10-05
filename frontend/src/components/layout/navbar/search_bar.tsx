import { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { toast } from "react-toastify";
import type { UserDTO } from "../../../dtos/models_dtos/UserDTO";
import userService from "../../../service/UserService";
import { SearchbarCard } from "./search_bar_card";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const q = query.trim();
    if (!q) return;

    setLoading(true);

    userService
      .searchUsers(q) 
      .then((res) => {
        setUsers(res?.content ?? []);
        setOpen(true);
      })
      .catch((err) => {
        toast.error(err?.response?.data || "Failed to search users");
        setUsers([]);
        setOpen(true);
      })
      .finally(() => setLoading(false));
  };

 

  return (
    <form
      ref={formRef}
      onSubmit={handleSearch}
      className="relative w-2/3 max-w-md hidden xl:block"
      role="search"
    >
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for users or projects..."
        className="peer w-full rounded-full bg-gray-200 dark:bg-slate-800/40 px-4 py-2 pr-10
                   text-sm text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                   ring-1 ring-gray-500/40
                   focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all duration-200"
        aria-label="Search users"
      />

      <button
        type="submit"
        disabled={loading || !query.trim()}
        className="absolute right-3 top-1/2 -translate-y-1/2
                   text-gray-500 dark:text-gray-400 hover:text-teal-500
                   disabled:opacity-50 transition-colors duration-200"
        aria-label="Submit search"
      >
        <BiSearch size={20} />
      </button>

      {/* results panel */}
      {open && (
        <div
          className="absolute left-0 right-0 mt-2 z-50 overflow-hidden
                     rounded-xl border border-slate-200 dark:border-slate-700
                     bg-white/95 dark:bg-slate-900/95 backdrop-blur
                     shadow-xl"
        >
          {/* header / status row */}
          <div className="flex items-center justify-between px-3 py-2 text-xs text-slate-500 dark:text-slate-400">
            <span>{loading ? "Searching…" : users.length ? `Results (${users.length})` : "No results"}</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-2 py-0.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Close
            </button>
          </div>

          {/* list */}
          <ul className="max-h-72 overflow-auto divide-y divide-slate-200 dark:divide-slate-800">
            {!loading && users.map(u => {
                return <SearchbarCard key={u.id} user={u} onOpen={() => setOpen(true)}/>
            })}

            {/* empty state */}
            {!loading && users.length === 0 && (
              <li className="px-3 py-4 text-sm text-slate-500 dark:text-slate-400">
                Try a different search term.
              </li>
            )}
          </ul>

          {/* footer: view all / go to advanced */}
          <div className="flex w-full items-center justify-center gap-2 px-3 py-2 ">
            <button
              type="button"
              className="cursor-pointer hover:bg-slate-500/50 w-full text-base px-2 py-1 rounded-md "
              onClick={() => {
                setOpen(false);
              }}
            >
              View all results
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
