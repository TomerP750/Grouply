import { useDm } from "../../../context/Dm_context";
import { useUser } from "../../../redux/hooks";
import { Avatar } from "../../shared/Avatar";
import type { DirectMessageRoomDTO } from "../models/direct.message.room.dto";

interface DmHistoryRowProps {
  room: DirectMessageRoomDTO;
}

export function DmHistoryRow({ room }: DmHistoryRowProps) {
    
  const { openConversation } = useDm();
  const loggedInUser = useUser();

  const getOtherUsername = (room: DirectMessageRoomDTO) => {
    if (!room) return "Username";

    const { sender, recipient } = room;

    if (!sender || !recipient) return "Username";

    // If I'm the sender, show the recipient; otherwise show the sender
    return loggedInUser.id === sender.id ? recipient.username : sender.username;
  };

  const otherUsername = getOtherUsername(room);

  return (
    <article
      onClick={() => openConversation(room)}
      className="group flex cursor-pointer items-center gap-3 rounded-xl
                 bg-neutral-200 dark:bg-stone-800 px-4 py-3
                 
                 hover:bg-neutral-300 dark:hover:bg-stone-900 
                 transition-colors duration-150"
    >
      <div className="relative flex-shrink-0">
        <Avatar className="w-10 h-10 aspect-square" />
      </div>

      <div className="flex min-w-0 flex-col">
        <p className="text-sm font-semibold text-slate-50 truncate">
          {otherUsername}
        </p>
        <p className="text-xs text-slate-400 truncate">
          Lorem ipsum dolor sit amet
        </p>
      </div>
    </article>
  );
}
