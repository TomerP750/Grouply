import type { JwtUser } from '../../../redux/AuthSlice'
import './user_menu_styles.css'

interface UserMenuProps {
  user: JwtUser | null;
}

export function UserMenu({ user }: UserMenuProps) {
  if (!user) return null;

  const { username } = user;

  return (
    <div className="user-menu absolute -bottom-68 right-2 bg-white w-80 h-64 text-black rounded-lg shadow-lg">
      <p className="p-3 font-medium">{username}</p>
    </div>
  )
}
