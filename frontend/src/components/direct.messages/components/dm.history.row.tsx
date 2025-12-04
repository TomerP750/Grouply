import { useDm } from "../../../context/Dm_context";
import type { DirectMessageRoomDTO } from "../models/direct.message.room.dto"

interface DmHistoryRowProps {
    room: DirectMessageRoomDTO
}

export function DmHistoryRow({ room }: DmHistoryRowProps) {

    const { recipient } = room;
    const { openConversation } = useDm();

    return (
        <article onClick={() => openConversation(recipient.id)} className="cursor-pointer px-5 py-2 bg-slate-700/50 rounded-lg">
            <p>{recipient.username}</p>
            <p className="text-sm">Lorem ipsum dolor sit amet  </p>
        </article>
    )
}