import { FaUserAlt } from "react-icons/fa";
import type { JwtUser } from "../../redux/AuthSlice";

interface AvatarProps {
    user?: JwtUser | null;
    size?: number
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

export function Avatar({ user, size }: AvatarProps) {

    if (!user) {
        return (
            <div style={{width: size}} className={`aspect-square 
                ${getRandomColor()} rounded-full
                inline-flex items-center justify-center
                `}> <FaUserAlt size={12}/> </div>
        )
    }
    return (
        <img src={user.avatar} alt="Avatar" style={{width: size}} className={`aspect-square`}/>
    )

}