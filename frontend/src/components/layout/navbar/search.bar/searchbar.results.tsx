import type { UserDTO } from "../../../../dtos/models_dtos/user_dto"
import { UserSearchResultCard } from "./user.search.result.card"

interface SearchBarResultsProps {
    users: UserDTO[]
}

export function SearchBarResults({ users }: SearchBarResultsProps) {
    return (
        <div
            className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-slate-800 
    shadow-lg border border-slate-300 dark:border-slate-700 
    rounded-lg max-h-60 overflow-y-auto z-50"
        >
            <ul className="divide-y divide-slate-200 dark:divide-slate-700">
                {users.map((u) => (
                    <li
                        key={u.id}
                        className="px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition"
                    >
                        <UserSearchResultCard user={u}/>
                    </li>
                ))}
            </ul>
        </div>
    )
}


