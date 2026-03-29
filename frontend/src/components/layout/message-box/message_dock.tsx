import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import directMessageRoomService from "../../../service/direct.message.room.service";
import { MessageButton } from "../../direct.messages/components/dm.message.button";
import { Conversation } from "./conversation";
import type { ChatRoomDTO } from "./model/chatroom.DTO";
import { Panel } from "./panel";
import { RecentChats } from "./recent_chats";


type DockState =
    | { view: "closed" }
    | { view: "list" }
    | { view: "conversation"; chatId: number };



export function MessageDock() {

    const [state, setState] = useState<DockState>({ view: "closed" });

    const [rooms, setRooms] = useState<ChatRoomDTO[]>([]);

    useEffect(() => {
        directMessageRoomService.directMessagesHistory()
        .then(res => {
            setRooms(res)   
        })
        .catch(err => toast.error(err.resposne.data));
    }, []);


    if (state.view === "closed") {
        return <MessageButton onOpen={() => setState({ view: "list" })} />;
    }

    function getPanel(dock: DockState, deps: {
        chats: ChatRoomDTO[];
        onOpen: () => void;
        onClose: () => void;
        onSelect: (id: number) => void;
        onBack: () => void;
    }) {
        switch (dock.view) {
            case "closed":
                return (
                    <MessageButton onOpen={deps.onOpen} />
                );

            case "list":
                return (
                    <div className="fixed bottom-5 right-5 z-50">
                        <Panel onClose={deps.onClose} title="Messages">
                            <RecentChats
                                chats={rooms}
                                onSelect={deps.onSelect}
                            />
                        </Panel>
                    </div>
                );

            case "conversation":
                
                const chat = deps.chats.find(c => c.id === dock.chatId);
                const name = chat?.name ?? "User";
                
                return (
                    <div className="fixed bottom-5 right-5 z-50">
                        <Panel onClose={deps.onClose} title="Messages">
                            <Conversation
                                name={name}
                                chatId={dock.chatId}   
                                onBack={deps.onBack}
                            />
                        </Panel>
                    </div>
                );


        }
    }

    return (
        <div className=" text-black dark:text-white">
            {getPanel(state, {
                chats: rooms,
                onOpen: () => setState({ view: "list" }),
                onClose: () => setState({ view: "closed" }),
                onSelect: (id) => setState({ view: "conversation", chatId: id }),
                onBack: () => setState({ view: "list" }),
            })}
        </div>
    );

}
