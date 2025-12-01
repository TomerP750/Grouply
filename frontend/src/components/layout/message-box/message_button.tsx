import { useMemo } from "react";
import { BiChat } from "react-icons/bi";
import { Badge } from "../../elements/Badge";
import type { ChatPreview } from "./recent_chat";


interface MessageButtonProps {
  chats: ChatPreview[];
  onOpen: () => void;
}


export function MessageButton({ chats, onOpen }: MessageButtonProps) {

  const totalUnread = useMemo(
    () => chats.reduce((sum, c) => sum + (c.unread || 0), 0),
    [chats]
  );

  return (
    <div className="hidden lg:block md:fixed bottom-5 right-5 z-50">
      <button
        onClick={onOpen}
        aria-label="Open messages"
        className="hidden md:flex justify-center items-center w-15
                   aspect-square rounded-full bg-gradient-to-r from-sky-600 to-sky-800 dark:from-teal-600 dark:to-teal-800
                   text-white shadow-xl hover:scale-110 duration-200
                   focus:outline-none focus:ring-4 focus:ring-teal-500/40"
      >
        <Badge Icon={BiChat} size={25} count={0} countPosition="tr"/>
      </button>
    </div>
  );
}
