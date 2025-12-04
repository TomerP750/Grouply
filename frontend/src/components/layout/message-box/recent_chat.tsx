import { useEffect, useMemo, useState } from "react";
import { BiPlus, BiSearch } from "react-icons/bi";

import { toast } from "react-toastify";
import type { UserDTO } from "../../../dtos/models_dtos/user_dto";
import connectionService from "../../../service/connection_service";
import { Avatar } from "../../elements/Avatar";

import directMessageRoomService from "../../../service/direct.message.room.service";
import directMessageService from "../../../service/direct.message.service";
import type { ChatRoomDTO } from "./model/chatroom.DTO";
import type { DirectMessageRoomDTO } from "../../direct.messages/models/direct.message.room.dto";

export type ChatPreview = {
  id: number;
  name: string;
  lastMessage: string;
  lastTimestamp: number;
  unread: number;
};

type Props = {
  chats: ChatRoomDTO[];
  onSelect: (chatId: number) => void;
  formatRelative: (ts: number) => string;
};

export function RecentChats({ chats, onSelect, formatRelative }: Props) {
  const [query, setQuery] = useState("");
  const [connections, setConnections] = useState<UserDTO[]>([]);
  const [listOpen, setListOpen] = useState(false);
 
  useEffect(() => {
    connectionService
      .allConnections()
      .then((res) => {
        setConnections(res);
      })
      .catch((err) => toast.error(err.response?.data || "Failed to load connections"));
  }, []);

 

  const handleStartChat = (connectionId: number) => {
    directMessageRoomService
      .getOrCreateRoom(connectionId)
      .then((room: DirectMessageRoomDTO) => {
        console.log("getelseroom: ", room);
        setListOpen(false);
        onSelect(room.id);
      })
      .catch((err) =>
        toast.error(err.response?.data || "Failed to open direct message")
      );
  };

  const toggleList = () => {
    setListOpen((prev) => !prev);
  };

  return (
    <>
      {/* Search + Add */}
      <div className="p-3">

        <div className="relative flex items-center gap-5">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search chats…"
            className="w-full rounded-xl pl-9 pr-3 py-2 text-sm
                       border border-slate-200 dark:border-slate-700
                       bg-white dark:bg-slate-800
                       focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
          <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 opacity-70" />

          {/* ---- BUTTON ADD ----- */}
          <button
            type="button"
            onClick={toggleList}
            className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <BiPlus size={20} />
          </button>

          {/* Dropdown with connections */}
          {listOpen && (
            <div
              className="absolute right-0 top-10 mt-2 w-64 rounded-xl border border-slate-200
                         dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg z-50"
            >
              <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 text-sm font-medium">
                Start new chat
              </div>
              <ul className="max-h-64 overflow-y-auto">
                {connections.map((connection) => (
                  <li key={connection.id}>
                    <button
                      type="button"
                      onClick={() => handleStartChat(connection.id)}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm
                                 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Avatar size={28} />
                      <span className="truncate">
                        {connection.username ?? `${connection.firstName} ${connection.lastName}`}
                      </span>
                    </button>
                  </li>
                ))}

                {connections.length === 0 && (
                  <li className="px-3 py-3 text-xs opacity-70">
                    You have no connections yet.
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

      </div>

      {/* List of existing chats */}
      
    
    </>
  );
}
