import { BiSearch, BiX } from "react-icons/bi";
import { useBodyScrollLock } from "../../../util/helper_hooks";
import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import userService from "../../../service/UserService";
import type { UserDTO } from "../../../dtos/models_dtos/UserDTO";
import { toast } from "react-toastify";

interface SearchBarProps {
  open: boolean;
  onClose: () => void; 
}

export function SearchBar({ open, onClose }: SearchBarProps) {

  const [query, setQuery] = useState<string>('');
  const [users, setUsers] = useState<UserDTO[]>([]);

  // const debouncedSearch = useMemo(() => {
  //   return debounce((value: string) => {
  //     userService.searchUsers(value)
  //     .then(res => {
  //       setUsers(res.content)
  //     })
  //     .catch(err => {
  //       toast.error(err.resopnse.data);
  //     })
  //   }, 500)
  // }, []);

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setQuery(value);
  //   debouncedSearch(value)
  // }

  // useEffect(() => {
  //   return () => {
  //     debouncedSearch.cancel();
  //   };
  // }, [debouncedSearch])


  useBodyScrollLock(open);

  return (
    <>
      {/* Backdrop Wrapper */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-30
          bg-black/80 
          transition-opacity duration-200
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        aria-hidden="true"
      />

      {/* search bar */}
      <div
        className={`
          fixed top-0 left-0 w-full h-50 flex flex-col items-center justify-start p-5  
          z-40
          bg-gray-100/90 dark:bg-gray-800/95 backdrop-blur border-b border-white/10
          transition-transform duration-300 ease-out will-change-transform
          ${open ? "translate-y-0" : "-translate-y-full"}
        `}
        role="dialog"
        aria-modal="true"
      >
        {/* Input bar */}

        <div className="w-9/10 flex justify-between items-center gap-2 relative">
          
          <div></div>

          <div className="relative w-4/10">
            <BiSearch
              size={22}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-black dark:text-slate-400"
            />
            <input
              type="text"
              value={query}
              // onChange={handleChange}
              placeholder="Search users..."
              className="block w-full rounded-lg dark:bg-slate-800 dark:hover:bg-slate-900 border border-black dark:border-white py-4 pl-11 pr-3 
              placeholder:text-black dark:placeholder:text-slate-500 focus:outline-none"
            />
          </div>

          <button onClick={onClose}><BiX size={40} className="cursor-pointer"/></button>

        </div>

      </div>
    </>
  );
}
