import { FaUserAlt } from "react-icons/fa";
import type { JwtUser } from "../../redux/AuthSlice";
import { useNavigate } from "react-router-dom";

interface AvatarProps {
    user?: JwtUser | null;
    size?: number
    onClick?: () => void
}

const colors = [
    "bg-indigo-400",
    "bg-pink-400",
    "bg-green-400",
    "bg-yellow-400",
    "bg-red-400",
    "bg-blue-400",
];

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}

export function Avatar({ user, size, onClick }: AvatarProps) {

    const navigate = useNavigate();


    if (!user?.avatar) {
        return (
            <div
                onClick={onClick}
                style={{ width: size }} className={`aspect-square 
                ${getRandomColor()} rounded-full
                inline-flex items-center justify-center cursor-pointer
                `}> <FaUserAlt size={12} />
            </div>
        )
    }
    return (
        <div 
        onClick={onClick}
        style={{ width: size }} className={`aspect-square 
                ${getRandomColor()} rounded-full
                inline-flex items-center justify-center cursor-pointer
                `}> <FaUserAlt size={12} />
        </div>
    )

}