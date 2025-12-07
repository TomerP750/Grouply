import { BiChevronRight } from "react-icons/bi";
import type { NotificationDTO } from "../../../../models/notification.dto";
import type { NotificationType } from "../../../../models/notification.type";
import { Avatar } from "../../../elements/Avatar";
import defaultAvatar from "../../../../assets/defaultAvatar.png"

interface NotificationCardProps {
  notification: NotificationDTO;
  isUnread?: boolean;
  onClick?: () => void;
}

export function NotificationCard({ notification, isUnread = true, onClick }: NotificationCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left
        transition-all duration-150
        hover:bg-slate-100 dark:hover:bg-slate-700/60
        ${isUnread ? "bg-slate-50 dark:bg-slate-800/80" : ""}
      `}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <img
          src={notification.actorAvatarUrl ? notification.actorAvatarUrl : defaultAvatar }
          alt={notification.actorUsername}
          className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-600"
        />
      </div>

      {/* Text content */}
      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
            {notification.actorUsername}
          </span>

          
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
          {notification.message}
        </p>
      </div>

    </button>
  );
}


