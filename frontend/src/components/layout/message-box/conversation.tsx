import { useEffect, useRef, useState, useMemo } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { Client, type IMessage } from "@stomp/stompjs";
import type { ChatMemberDTO } from "./model/chatmember.DTO";
import type { ChatMessageDTO } from "./model/chatmessageDTO";
import { useUser } from "../../../redux/hooks";
import { toast } from "react-toastify";
import chatRoomService from "../../../service/chatroom.service";
import type { ChatRoomDTO } from "./model/chatroom.DTO";

type Props = {
  name: string;
  chatId: number;    
  onBack: () => void;
};

export function Conversation({ name, chatId, onBack }: Props) {
  
  const [messages, setMessages] = useState<ChatMessageDTO[]>([]);
  const [input, setInput] = useState("");
  const [chatRoom, setChatRoom] = useState<ChatRoomDTO | undefined>();

  const stompClientRef = useRef<Client | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const user = useUser();
  const currentUserId = user.id;

  // load room (members, etc.)
  useEffect(() => {
    chatRoomService.getRoom(chatId)
      .then((res) => {
        setChatRoom(res);
      })
      .catch((err) => toast.error(err.response?.data || "Failed to load chat room"));
  }, [chatId]);

  // find the ChatMember entry for the current user
  const currentChatMember: ChatMemberDTO | undefined = useMemo(
    () => chatRoom?.members.find((m) => m.userId === currentUserId),
    [chatRoom, currentUserId]
  );

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // WebSocket connect + subscribe
  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws",
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Connected to WebSocket");

        client.subscribe(`/topic/rooms/${chatId}`, (frame: IMessage) => {
          const body: ChatMessageDTO = JSON.parse(frame.body);
          setMessages((prev) => [...prev, body]);
        });
      },
      onStompError: (frame) => {
        console.error("Broker error:", frame.headers["message"]);
        console.error("Details:", frame.body);
      },
    });

    client.activate();
    stompClientRef.current = client;

    return () => {
      client.deactivate();
      stompClientRef.current = null;
    };
  }, [chatId]);

  const sendMessage = () => {
    const client = stompClientRef.current;
    if (!client || !client.connected) return;
    if (!input.trim()) return;

    if (!chatRoom) {
      toast.error("Chat room is not loaded yet");
      return;
    }

    if (!currentChatMember) {
      toast.error("You are not a member of this chat room");
      return;
    }

    const payload: Partial<ChatMessageDTO> = {
      content: input.trim(),
      chatRoomId: chatRoom.id,
      sender: { id: currentChatMember.id } as ChatMemberDTO,
    };

    client.publish({
      destination: "/app/sendMessage",
      body: JSON.stringify(payload),
    });

    setInput("");
  };

  return (
    <>
      {/* Header row  */}
      <div className="flex items-center gap-2 p-3 border-b dark:border-slate-800">
        <button
          type="button"
          onClick={onBack}
          className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Back"
        >
          <BiChevronLeft size={22} />
        </button>
        <h4 className="font-medium truncate">{name}</h4>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((m) => {
          const fromMe = m.sender?.userId === currentUserId;
          return (
            <div
              key={m.id}
              className={`flex ${fromMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                  fromMe
                    ? "bg-teal-600 text-white rounded-br-none"
                    : "bg-slate-100 dark:bg-slate-800 text-black dark:text-white rounded-bl-none"
                }`}
              >
                <p>{m.content}</p>
                {m.sentAt && (
                  <p className="mt-1 text-[10px] opacity-60 text-right">
                    {new Date(m.sentAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {messages.length === 0 && (
          <div className="self-start max-w-[80%] rounded-2xl px-3 py-2 bg-slate-100 dark:bg-slate-800 text-sm opacity-70">
            No messages yet. Say hi 👋
          </div>
        )}
      </div>

      {/* Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="p-3 border-t dark:border-slate-800"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message…"
          className="w-full rounded-xl px-3 py-2 border border-slate-200 dark:border-slate-700
                     bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-600"
        />
      </form>
    </>
  );
}
