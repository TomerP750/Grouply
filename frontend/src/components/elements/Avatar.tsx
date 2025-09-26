import type { JwtUser } from "../../redux/AuthSlice";

interface AvatarProps {
    user?: JwtUser | null;
    size?: number
}

export function Avatar({ user, size }: AvatarProps) {

    if (!user) {
        return (
            <div style={{width: size}} className={`aspect-square bg-indigo-400 rounded-full`}>

            </div>
        )
    }
    return (
        <img src={user.avatar} alt="Avatar" style={{width: size}} className={`aspect-square`}/>
    )

}