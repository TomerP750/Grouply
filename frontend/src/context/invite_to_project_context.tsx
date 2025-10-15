import { useContext, createContext, type ReactNode, useState } from "react";

type InviteToProjectState = {
    recipientId: number
} | undefined

const InviteToProjectContext = createContext<InviteToProjectState>(undefined);

interface ProviderProps {
    children: ReactNode
    initRecipientId: number
}

export function InviteToProjectProvider({ children, initRecipientId }: ProviderProps) {
    const [recipientId] = useState<number>(initRecipientId);

    const ctx = {recipientId};

    return (
        <InviteToProjectContext.Provider value={ctx}>
            {children}
        </InviteToProjectContext.Provider>
    )
}


export function useInviteToProject() {
    const ctx = useContext(InviteToProjectContext);
    if (!ctx) {
        throw new Error("useInviteToProject must be used within InviteToProjectProvider")
    }
    return ctx;
}