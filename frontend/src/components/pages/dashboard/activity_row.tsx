import { NavLink, useNavigate } from "react-router-dom";
import type { ActivityDTO } from "../../../dtos/models_dtos/activity_dto";
import { timeAgo } from "../../../util/util_functions";
import { ActivityType } from "../../../dtos/enums/activity_type";
import type { IconType } from "react-icons";
import { BiUserCheck, BiUserPlus, BiRocket, BiCircle, BiSend, BiEnvelope } from "react-icons/bi";
import { useScrollToTop } from "../../../util/helper_hooks";

interface ActivityRowProps {
    activity: ActivityDTO
}

export function ActivityRow({ activity }: ActivityRowProps) {

    const navigate = useNavigate();

    const { id, message, createdAt, navigateLink, activityType } = activity;

    const Icon = getIconByType(activityType);

    console.log(activity);
    

    
    return (
        <div key={id} className="flex items-center gap-1 ">
            <Icon className="text-teal-500" size={22} />
            <p className="inline-flex items-center gap-1 text-sm text-slate-800 dark:text-slate-100">
                <NavLink
                    to={navigateLink}
                    title={navigateLink}
                    className="cursor-pointer hover:underline hover:underline-offset-2">{message}
                </NavLink>
                <span className="text-slate-500 text-xs">● {timeAgo(createdAt)}</span>
            </p>
        </div>
    )
}

const getIconByType = (type: ActivityType): IconType => {
    switch (type) {
        case ActivityType.CONNECTED:
            return BiUserCheck;
        case ActivityType.SENT_CONNECTION_REQUEST:
            return BiUserPlus;
        case ActivityType.SENT_JOIN_REQUEST:
            return BiEnvelope;
        case ActivityType.JOINED_PROJECT:
            return BiRocket;
        default:
            return BiCircle;
    }
};