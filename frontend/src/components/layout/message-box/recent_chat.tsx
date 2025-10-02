import { useMemo, useState } from "react";
import { BiSearch } from "react-icons/bi";

import { Avatar } from "../../elements/Avatar";

export type ChatPreview = {
  id: string;
  name: string;
  lastMessage: string;
  lastTimestamp: number; // epoch ms
  unread: number;
};

type Props = {
  chats: ChatPreview[];
  onSelect: (chatId: string) => void;
  formatRelative: (ts: number) => string;
};

export function RecentChats({ chats, onSelect, formatRelative }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return chats;
    return chats.filter(
      c =>
        c.name.toLowerCase().includes(q) ||
        c.lastMessage.toLowerCase().includes(q)
    );
  }, [query, chats]);

  return (
    <>
      {/* Search */}
      <div className="p-3">
        <div className="relative">
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
        </div>
      </div>

      {/* List */}
      <ul className="flex-1 overflow-y-auto px-2 pb-2 space-y-1">
        {filtered.map((c) => (
          <li key={c.id}>
            <button
              type="button"
              onClick={() => onSelect(c.id)}
              className="w-full flex items-center gap-3 p-2 rounded-xl
                         hover:bg-slate-100 dark:hover:bg-slate-800 text-left"
            >
              <Avatar size={30} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium truncate">{c.name}</span>
                  <span className="text-xs opacity-60 ml-auto">
                    {formatRelative(c.lastTimestamp)}
                  </span>
                </div>
                <div className="text-sm opacity-70 truncate" dir="auto">
                  {c.lastMessage}
                </div>
              </div>
              {c.unread > 0 && (
                <span className="ml-1 inline-flex items-center justify-center min-w-6 h-6 px-2 text-xs font-semibold rounded-full bg-teal-600 text-white">
                  {c.unread}
                </span>
              )}
            </button>
          </li>
        ))}
        
        {filtered.length === 0 && (
          <li className="px-3 py-8 text-center text-sm opacity-70">
            No chats found
          </li>
        )}
      </ul>
    </>
  );
}
