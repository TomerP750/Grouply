import { useState } from "react";
import { formatRelative } from "../../../util/util_functions";
import { MessageButton } from "./message_button";
import { Panel } from "./panel";
import { type ChatPreview, RecentChats } from "./recent_chat";
import { Conversation } from "./conversation";


type DockState =
    | { view: "closed" }
    | { view: "list" }
    | { view: "conversation"; chatId: string };

const mockChats: ChatPreview[] = [
    { id: "1", name: "user1", lastMessage: "Cool, let’s ship it today.", lastTimestamp: Date.now() - 1000 * 60 * 3, unread: 2 },
    { id: "2", name: "user2", lastMessage: "pushed the fix to main", lastTimestamp: Date.now() - 1000 * 60 * 40, unread: 0 },
    { id: "3", name: "user3", lastMessage: "Call me when you’re free", lastTimestamp: Date.now() - 1000 * 60 * 60 * 3, unread: 1 },
];

export function MessageDock() {

    const [state, setState] = useState<DockState>({ view: "closed" });

    if (state.view === "closed") {
        return <MessageButton chats={mockChats} onOpen={() => setState({ view: "list" })} />;
    }

    function getPanel(dock: DockState, deps: {
        chats: ChatPreview[];
        onOpen: () => void;
        onClose: () => void;
        onSelect: (id: string) => void;
        onBack: () => void;
    }) {
        switch (dock.view) {
            case "closed":
                return (
                    <MessageButton chats={deps.chats} onOpen={deps.onOpen} />
                );

            case "list":
                return (
                    <div className="fixed bottom-5 right-5 z-50">
                        <Panel onClose={deps.onClose} title="Messages">
                            <RecentChats
                                chats={deps.chats}
                                formatRelative={formatRelative}
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
                            <Conversation name={name} onBack={deps.onBack} />
                        </Panel>
                    </div>
                );
        }
    }

    return (
        <div className=" text-black dark:text-white">
            {getPanel(state, {
                chats: mockChats,
                onOpen: () => setState({ view: "list" }),
                onClose: () => setState({ view: "closed" }),
                onSelect: (id) => setState({ view: "conversation", chatId: id }),
                onBack: () => setState({ view: "list" }),
            })}
        </div>
    );

}
