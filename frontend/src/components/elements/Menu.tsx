import type { ReactNode } from "react";
import './Menu.css';

interface MenuProps {
    children: ReactNode
    className?: string
}

export function Menu({ children, className }: MenuProps) {
    return (
        <menu className={`menu ${className} z-1000`}>
            {children}
        </menu>
    )
}