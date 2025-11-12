import type { ReactNode } from "react";
import './Menu.css';
import { createPortal } from "react-dom";

interface MenuProps {
    children: ReactNode
    className?: string
}

export function Menu({ children }: MenuProps) {
    return (
        // <menu className={`menu ${className} z-[1000]`}>
        //     {children}
        // </menu>
        createPortal(children, document.body)
    )
}