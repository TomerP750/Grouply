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

export function DirectMessageConversation() {

    const [room, setRoom] = useState<DirectMessageRoomDTO>();
    const { selectedRecipientId, openHistory } = useDm();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<SendDmDTO>();

    useEffect(() => {
        if (selectedRecipientId) {
            directMessageRoomService.getOrCreateRoom(selectedRecipientId)
                .then(res => {
                    setRoom(room)
                })
                .catch(err => {
                    toast.error(err.response.data);
                })
        }
    }, []);

    const sendDm = () => {


        reset();
    }

    return (
        <div className="flex h-[420px] flex-col">

            {/* Header */}
            <header className="flex items-center gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-700">
                <button
                    type="button"
                    onClick={openHistory}
                    className="cursor-pointer inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                    <FaArrowLeft/>
                </button>

                <div className="flex flex-1 items-center gap-3">
                    {/* Avatar */}
                    <Avatar className="w-10 aspect-square"/>

                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            Username
                        </span>
                       
                    </div>
                </div>

                <button
                    type="button"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                    ⋮
                </button>
            </header>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3 text-sm">
                {/* Date divider */}
                <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
                    <span className="text-[11px] uppercase tracking-wide text-slate-400">
                        Today
                    </span>
                    <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
                </div>

                {/* Incoming message */}
                <div className="flex justify-start">
                    <div className="max-w-[75%] rounded-2xl rounded-bl-sm bg-slate-100 px-3 py-2 text-sm text-slate-900 shadow-sm dark:bg-slate-800 dark:text-slate-100">
                        <p>Hey, what&apos;s up? </p>
                        <span className="mt-1 block text-[10px] text-slate-400 dark:text-slate-500">
                            09:35
                        </span>
                    </div>
                </div>

                {/* Outgoing message */}
                <div className="flex justify-end">
                    <div className="max-w-[75%] rounded-2xl rounded-br-sm bg-teal-700  px-3 py-2 text-sm text-white shadow-sm">
                        <p>All good! Just working on the project.</p>
                        <span className="mt-1 block text-[10px] text-teal-100/80">
                            09:36
                        </span>
                    </div>
                </div>

                {/* Another incoming */}
                <div className="flex justify-start">
                    <div className="max-w-[75%] rounded-2xl rounded-bl-sm bg-slate-100 px-3 py-2 text-sm text-slate-900 shadow-sm dark:bg-slate-800 dark:text-slate-100">
                        <p>Nice! Want to hop on a call later?</p>
                        <span className="mt-1 block text-[10px] text-slate-400 dark:text-slate-500">
                            09:38
                        </span>
                    </div>
                </div>
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit(sendDm)} className="border-t border-slate-200 px-3 py-2 dark:border-slate-700">
                <div className="flex items-center gap-2 rounded-2xl bg-slate-100 px-3 py-1.5 dark:bg-slate-800/80">
                    <input
                        placeholder={`Message @Username...`}
                        {...register("message", {
                            required: true,
                            max: 300
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
                        className="cursor-pointer inline-flex h-8 w-8 items-center justify-center rounded-full bg-teal-700 text-white text-xs shadow-sm transition hover:bg-teal-600"
                    >
                        <BiSend size={18}/>
                    </button>
                </div>
            </form>
        </div>
    );
}
