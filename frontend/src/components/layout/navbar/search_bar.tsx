import { BiSearch } from "react-icons/bi";


interface SearchBarProps {
    query: string
    setQuery: (val: string) => void;
}

export function SearchBar({ query, setQuery }: SearchBarProps) {
    return (
        <div className="relative w-2/3 max-w-md">
            <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for users or projects..."
                className="peer w-full rounded-full bg-gray-200 dark:bg-slate-800/40 px-4 py-2 pr-10
                           text-sm text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
            />
            <BiSearch
                size={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400
                           peer-focus:text-teal-500 transition-colors duration-200"
            />
        </div>
    );
}
