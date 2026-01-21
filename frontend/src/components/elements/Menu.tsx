import type { ReactNode } from "react";
import './Menu.css';
import { createPortal } from "react-dom";

interface MenuProps {
    children: ReactNode
    className?: string
}

export function Menu({ children }: MenuProps) {
    return (
        createPortal(children, document.body)
    )
}