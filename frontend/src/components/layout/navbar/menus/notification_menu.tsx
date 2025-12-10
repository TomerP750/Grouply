import { BiBellMinus, BiChat, BiGroup } from "react-icons/bi";
import { Menu } from "../../../elements/Menu";
import type { NotificationDTO } from "../../../../models/notification.dto";
import { NotificationCard } from "./notification.card";

interface NotificationMenuProps {
    notifications: NotificationDTO[];
}

export function NotificationMenu({ notifications }: NotificationMenuProps) {

    const hasNotifications = notifications.length > 0;

    if (!notifications) {
        return (
            <Menu>
                <div className="animate-[bounceUp_0.25s_ease-out_forwards] gap-5 bg-gradient-to-br from-white to-slate-100 dark:from-slate-800 dark:to-slate-900 flex flex-col justify-center items-start py-5 px-4 absolute top-2 mt-15 right-30 w-95 max-w-95 min-h-64 rounded-2xl shadow-2xl dark:text-gray-300">
                    <menu className="w-full flex flex-col items-center">

                        <BiBellMinus size={40} />
                        <p className="text-sm text-center">No New Notifications</p>

                    </menu>

                </div>
            </Menu>
        )
    }

    return (
        <Menu>
            <div className="z-1000 animate-[bounceUp_0.25s_ease-out_forwards] gap-4 bg-gradient-to-br from-white to-slate-100 dark:from-slate-800 dark:to-slate-900 flex flex-col items-stretch py-4 px-4 absolute top-2 mt-15 right-30 w-95 max-w-95 min-h-64 rounded-2xl shadow-2xl dark:text-gray-300">

                <header className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-100">
                        Notifications
                    </p>
                    {hasNotifications && (
                        <button className="text-[11px] text-sky-600 dark:text-teal-400 hover:underline">
                            Mark all as read
                        </button>
                    )}
                </header>

                {!hasNotifications ? (
                    <menu className="w-full flex flex-col items-center justify-center flex-1 gap-3">
                        <BiBellMinus size={40} className="text-slate-400" />
                        <p className="text-sm text-center text-slate-500 dark:text-slate-400">
                            No New Notifications
                        </p>
                    </menu>
                ) : (
                    <ul className="flex-1 w-full max-h-80 overflow-y-auto space-y-1">
                        {notifications.map((n, idx) => (
                            <li key={idx}>
                                <NotificationCard
                                    notification={n}
                                    isUnread={true}
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Menu>
    );
}