import { NavLink } from "react-router-dom";
import type { FooterItem } from "./FooterTop";

interface FooterItemProps {
    footerItem: FooterItem
}

const linkStyle = "hover:text-slate-700 dark:hover:text-teal-300 transition-colors duration-200";

export function FooterItem({ footerItem }: FooterItemProps) {

    const { title, link1, link2, link3 } = footerItem;

    return (
        <div>
            <h3 className="text-sm font-medium uppercase tracking-wide dark:text-white">
                {title}
            </h3>
            <ul className="mt-4 space-y-3 dark:text-white/80 text-sm">
                <li><NavLink to="#" className={`${linkStyle}`}>{link1}</NavLink></li>
                <li><NavLink to="#" className={`${linkStyle}`}>{link2}</NavLink></li>
                <li><NavLink to="#" className={`${linkStyle}`}>{link3}</NavLink></li>
            </ul>
        </div>
    )
}