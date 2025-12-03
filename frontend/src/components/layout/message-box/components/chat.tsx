import { useEffect, useRef, useState } from "react";
import { Client, type IMessage } from "@stomp/stompjs";

interface ChatMessage {
  from: string;
  content: string;
}

export function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const stompClientRef = useRef<Client | null>(null);

  useEffect(() => {
    const client = new Client({
      // PURE WebSocket (no SockJS)
      brokerURL: "ws://localhost:8080/ws", // 👈 make sure this matches your Spring endpoint

      reconnectDelay: 5000,

      onConnect: () => {
        console.log("Connected");

        client.subscribe("/topic/public", (message: IMessage) => {
          const body: ChatMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, body]);
        });
      },

      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
    });

    client.activate();
    stompClientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, []);

  const sendMessage = () => {
    const client = stompClientRef.current;
    if (!client || !client.connected) return;
    if (!input.trim()) return;

    const msg: ChatMessage = {
      from: "Tomer", // replace with auth user
      content: input,
    };

    client.publish({
      destination: "/app/chat.send",
      body: JSON.stringify(msg),
    });

    setInput("");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="border rounded-md p-2 h-64 overflow-y-auto mb-2">
        {messages.map((m, idx) => (
          <div key={idx} className="mb-1">
            <strong>{m.from}:</strong> {m.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-2 py-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
        />
        <button
          className="border rounded px-3 py-1"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
