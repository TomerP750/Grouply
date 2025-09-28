import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserDTO } from "../../dtos/models_dtos/UserDTO";
import defaultAvatar from "../../assets/defaultAvatar.png";

interface AvatarProps {
    user?: UserDTO | null;
    size?: number
    onClick?: () => void
    className?: string
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

export function Avatar({ user, size, onClick, className }: AvatarProps) {

    const navigate = useNavigate();


    if (!user?.avatarUrl) {
        return (
            <div
                onClick={onClick}
                style={{ width: size }} 
                className={`aspect-square 
                ${getRandomColor()} rounded-full
                inline-flex items-center justify-center 
                ${className}
                `}> <FaUserAlt size={12} />
            </div>

            // <img src={defaultAvatar} alt="avatar"
            //     onClick={onClick}
            //     style={{ width: size }} 
            //     className={`aspect-square 
            //     ${getRandomColor()} rounded-full
            //      object-center object-cover
            //     ${className}
            //     `}/> 
        )
    }
    return (
        <div 
        onClick={onClick}
        style={{ width: size }} 
        className={`aspect-square 
                ${getRandomColor()} rounded-full
                inline-flex items-center justify-center 
                ${className}
                `}> <FaUserAlt size={12} />
        </div>
    )

}