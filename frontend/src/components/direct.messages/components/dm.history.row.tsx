import { useDm } from "../../../context/Dm_context";
import { useUser } from "../../../redux/hooks";
import { Avatar } from "../../elements/Avatar";
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
                 bg-slate-800/60 px-4 py-3
                 border border-slate-700/70
                 hover:bg-slate-800 hover:border-teal-500/70
                 transition-colors duration-150"
    >
      <div className="relative flex-shrink-0">
        <Avatar className="w-10 h-10 aspect-square" />
      
        {/* <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900" /> */}
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
