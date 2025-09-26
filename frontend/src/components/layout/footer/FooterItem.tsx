import { NavLink } from "react-router-dom";
import type { FooterItem } from "./FooterTop";

interface FooterItemProps {
    footerItem: FooterItem
}

export function FooterItem({ footerItem }: FooterItemProps) {

    const { title, link1, link2, link3 } = footerItem;

    return (
        <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider dark:text-slate-300">
                {title}
            </h3>
            <ul className="mt-4 space-y-3 ">
                <li><NavLink to="#" className="hover:text-indigo-300">{link1}</NavLink></li>
                <li><NavLink to="#" className="hover:text-indigo-300">{link2}</NavLink></li>
                <li><NavLink to="#" className="hover:text-indigo-300">{link3}</NavLink></li>
            </ul>
        </div>
    )
}