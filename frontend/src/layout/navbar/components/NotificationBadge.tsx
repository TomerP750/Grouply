
import { useState } from "react";
import { BiBell } from "react-icons/bi";
import { useUserSelector } from "../../../shared/store/hooks";
import { Badge } from "../../../shared/ui/Badge";
import { NotificationMenu } from "../menus/NotificationsMenu";

interface NotificationBadgeProps {
    onOpen: () => void;
    open: boolean
}


export function NotificationBadge({ onOpen, open }: NotificationBadgeProps) {

    const [count, setCount] = useState(0);

    // const [notifications, setNotifications] = useState<NotificationDTO[]>([]);
    const [notifications, setNotifications] = useState<[]>([]);

    const user = useUserSelector(state => state.authSlice.user);


    return (

        <div className="relative hover:bg-gray-500/20">
            <button onClick={onOpen}>
                <Badge Icon={BiBell} size={28} count={count} className="cursor-pointer p-3" />
            </button>

            {open && <NotificationMenu notifications={notifications} />}

        </div>

    );
}