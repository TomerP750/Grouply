import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";
import type { DirectMessageRoomDTO } from "../components/direct.messages/models/direct.message.room.dto";
import { useUser } from "../redux/hooks";

export type DmDockState = "button" | "history" | "conversation";

type DmContextValue = {
    state: DmDockState;
    selectedRecipientId: number | null;
    openHistory: () => void;
    openConversation: (room: DirectMessageRoomDTO) => void;
    closeDock: () => void;
};

const DmContext = createContext<DmContextValue | undefined>(undefined);

interface DmProviderProps {
    children: ReactNode;
}

export function DmProvider({ children }: DmProviderProps) {

    const [state, setState] = useState<DmDockState>("button");
    const [selectedRecipientId, setSelectedRecipientId] = useState<number | null>(null);

    const user = useUser();

    const openHistory = () => {
        setSelectedRecipientId(null);
        setState("history");
    }

    const openConversation = (room: DirectMessageRoomDTO) => {

        const other =
            room.sender.id === user.id ? room.recipient : room.sender;

        setSelectedRecipientId(other.id);
        setState("conversation");
    };

    const closeDock = () => {
        setState("button");
        setSelectedRecipientId(null);
    };

    const value: DmContextValue = { state, selectedRecipientId, openHistory, openConversation, closeDock };

    return (
        <DmContext.Provider value={value}>
            {children}
        </DmContext.Provider>
    );
}

export function useDm() {
    const ctx = useContext(DmContext);
    if (!ctx) {
        throw new Error("useDm must be used inside <DmProvider>");
    }
    return ctx;
}
