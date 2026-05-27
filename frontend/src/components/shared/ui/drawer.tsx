import type { ReactNode } from "react";
import { createPortal } from "react-dom";

interface DrawerProps {
    children: ReactNode
}

export function Drawer({ children }: DrawerProps) {
    return (
        createPortal(children, document.body)
    )
}