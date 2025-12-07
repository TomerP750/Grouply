
import { useEffect, useState } from "react";
import { useUserSelector } from "../../../redux/hooks";
import { Badge } from "../../elements/Badge";
import { NotificationMenu } from "./menus/notification_menu";
import { BiBell } from "react-icons/bi";
import type { NotificationDTO } from "../../../models/notification.dto";

interface NotificationBadgeProps {
    onOpen: () => void;
    open: boolean
}


export function NotificationBadge({ onOpen, open }: NotificationBadgeProps) {

    const [count, setCount] = useState(0);

    const [notifications, setNotifications] = useState<NotificationDTO[]>([]);

    const user = useUserSelector(state => state.authSlice.user);

    useEffect(() => {
        if (!user) return;

        const userId = user.id;
        const url = `http://localhost:8080/api/notifications/stream/${userId}`;
        console.log("[NotificationBadge] opening SSE:", url);

        const eventSource = new EventSource(url);

        eventSource.addEventListener("notification-badge", (event) => {
            const msgEvent = event as MessageEvent;
            console.log("[NotificationBadge] notification-badge:", msgEvent.data);

            let dto: NotificationDTO;
            try {
                dto = JSON.parse(msgEvent.data) as NotificationDTO;
            } catch {
                
                return;
            }

            setCount((prev) => prev + 1);
            setNotifications((prev) => [dto, ...prev]);
        });

        eventSource.onerror = (err) => {
            console.error("[NotificationBadge] SSE error:", err);
        };

        return () => {
            console.log("[NotificationBadge] closing SSE");
            eventSource.close();
        };
    }, [user?.id]);


    return (

        <div className="relative hover:bg-gray-500/20">
            <button onClick={onOpen}>
                <Badge Icon={BiBell} size={28} count={count} className="cursor-pointer p-3" />
            </button>

            {open && <NotificationMenu notifications={notifications} />}

        </div>

    );
}