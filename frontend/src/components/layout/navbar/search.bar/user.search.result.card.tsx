import { useNavigate } from "react-router-dom";
import type { UserDTO } from "../../../../dtos/models_dtos/user_dto";


interface UserSearchResultCardProps {
    user: UserDTO
}

export function UserSearchResultCard({ user }: UserSearchResultCardProps) {

    const navigate = useNavigate();

    return (
        <article onClick={() => navigate(`/profile/${user.id}`)} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-300 dark:bg-slate-600"></div>

            <div className="flex flex-col">
                <span className="font-medium text-black dark:text-white">
                    {user.firstName} {user.lastName}
                </span>
                <span className="text-sm text-slate-500">@{user.username}</span>
            </div>
        </article>
    )
}