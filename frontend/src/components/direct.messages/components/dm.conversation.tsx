import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiSend } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDm } from "../../../context/Dm_context";
import directMessageRoomService from "../../../service/direct.message.room.service";
import { Avatar } from "../../elements/Avatar";
import type { DirectMessageRoomDTO } from "../models/direct.message.room.dto";
import type { SendDmDTO } from "../models/send.dm.dto";
import type { DirectMessageDTO } from "../models/direct.message.dto";
import directMessageService from "../../../service/direct.message.service";
import { useUser } from "../../../redux/hooks";
import { Client } from "@stomp/stompjs";
import "./dm.styles.css"

export function DirectMessageConversation() {

    const [room, setRoom] = useState<DirectMessageRoomDTO>();
    const [messages, setMessages] = useState<DirectMessageDTO[]>([]);
    const { selectedRecipientId, openHistory } = useDm();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<SendDmDTO>();
    const loggedInUser = useUser();

    const formatTime = (iso: string) =>
        new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });


    const getOtherUsername = () => {
        if (!room) return "Username";

        const { sender, recipient } = room;

        if (!sender || !recipient) return "Username";

        // If I'm the sender, show the recipient; otherwise show the sender
        return loggedInUser.id === sender.id
            ? recipient.username
            : sender.username;
    };

    const otherUsername = getOtherUsername();


    useEffect(() => {

        if (!room?.id) return;

        const stompClient = new Client({

            brokerURL: "ws://localhost:8080/ws",
            reconnectDelay: 5000,
            debug: (str) => console.log(str),
            onConnect: () => {
                console.log("STOMP connected");
                stompClient?.subscribe(`/topic/dm/${room.id}`, (msg) => {
                    const body: DirectMessageDTO = JSON.parse(msg.body);
                    setMessages((prev) => [...prev, body]);
                });
            },
            onStompError: (frame) => {
                console.error("Broker error", frame.headers["message"], frame.body);
            },
        });

        stompClient.activate();

        return () => {
            stompClient?.deactivate();
        };
        
    }, [room?.id]);



    useEffect(() => {

        if (!selectedRecipientId) return;

        directMessageRoomService
            .getOrCreateRoom(selectedRecipientId)
            .then(res => {
                setRoom(res);
                console.log("room: ", res);
                return directMessageService.roomMessages(res.id);
            })
            .then(res => {
                setMessages(res.content);
                console.log("msgs: ", res);

            })
            .catch(err => {
                toast.error(err.response?.data || "Something went wrong");
            });
    }, [selectedRecipientId]);

    const sendDm = (data: SendDmDTO) => {

        if (!room) return;

        directMessageService.sendMessage(room?.id, data)
            .then(() => {
                toast.success("message sent: " + data.message)
            })
            .catch(err => {
                toast.error(err.response.data);
            })

        reset();
    }

    return (
        <div className="flex max-h-[400px] flex-col">

            {/* Header */}
            <header className="flex items-center gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-700">
                <button
                    type="button"
                    onClick={openHistory}
                    className="cursor-pointer inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                    <FaArrowLeft />
                </button>

                <div className="flex flex-1 items-center gap-3">
                    {/* Avatar */}
                    <Avatar className="w-10 aspect-square" />

                    <div className="flex flex-col">
                      
                        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            {otherUsername}
                        </span>

                    </div>
                </div>

            </header>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3 text-sm dm-conversation">

                <div className="justify-start rounded-bl-sm bg-slate-100 
                text-slate-900 dark:bg-slate-800 dark:text-slate-100
                max-w-3/4 rounded-2xl px-3 py-2 text-sm shadow-sm
                ">
                    This is the beginning of the chat
                </div>

                {messages.map((msg) => {

                    const isMine = msg.sender.id === loggedInUser.id;

                    return (
                        <div
                            key={msg.id}
                            className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={
                                    "max-w-3/4 rounded-2xl px-3 py-2 text-sm shadow-sm " +
                                    (isMine
                                        ? "rounded-br-sm bg-sky-700 text-white"
                                        : "rounded-bl-sm bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100")
                                }
                            >
                                <p>{msg.message}</p>

                                <span
                                    className={
                                        "mt-1 block text-[10px] " +
                                        (isMine
                                            ? "text-teal-100/80"
                                            : "text-slate-400 dark:text-slate-500")
                                    }
                                >
                                    {formatTime(msg.sentAt)}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Input  */}
            <form onSubmit={handleSubmit(sendDm)} className="border-t border-slate-200 px-3 py-2 dark:border-slate-700">
                <div className="flex items-center gap-2 rounded-2xl bg-slate-100 px-3 py-1.5 dark:bg-slate-800/80">
                    <input
                        autoComplete="off"
                        placeholder={`Message @${otherUsername}...`}
                        {...register("message", {
                            required: true,
                            max: 300,
                        })}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleSubmit(sendDm)();
                            }
                        }}
                        className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-slate-100 dark:placeholder:text-slate-500"
                    />

                    <button
                        type="submit"
                        className="cursor-pointer inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-700 text-white text-xs shadow-sm transition hover:bg-sky-600"
                    >
                        <BiSend size={18} />
                    </button>
                </div>
            </form>


        </div>
    );
}
