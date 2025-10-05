import { useNavigate } from "react-router-dom";
import type { UserDTO } from "../../../dtos/models_dtos/UserDTO";

interface SearchbarCardProps {
    user: UserDTO
    onOpen: () => void;
}

export function SearchbarCard({ user, onOpen }: SearchbarCardProps) {

    const navigate = useNavigate();

    return (
        <li
            className="flex items-center gap-3 px-3 py-2 cursor-pointer
                           hover:bg-slate-50 dark:hover:bg-slate-800"
            onClick={() => {
                navigate(`/profile/${user.id}`) 
                onOpen;
            }}
        >
            {/* avatar (falls back to initials) */}
            {user.avatarUrl ? (
                <img
                    src={user.avatarUrl}
                    alt={user.username}
                    className="h-8 w-8 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                />
            ) : (
                <div className="h-8 w-8 rounded-full grid place-items-center
                                  bg-slate-200 dark:bg-slate-700 text-xs font-medium">
                    {(user.username?.[0] ?? "U").toUpperCase()}
                </div>
            )}

            <div className="min-w-0">
                <div className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                    {user.username}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </li>
    )
}