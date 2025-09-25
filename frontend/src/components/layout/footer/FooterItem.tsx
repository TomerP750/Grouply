import { NavLink } from "react-router-dom";
import type { FooterItem } from "./FooterItems";

interface FooterItemProps {
    footerItem: FooterItem
}

export function FooterItem({ footerItem }: FooterItemProps) {

    const { title, link1, link2, link3 } = footerItem;

    return (
        <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                {title}
            </h3>
            <ul className="mt-4 space-y-3 text-slate-200">
                <li><NavLink to="#" className="hover:text-indigo-300">{link1}</NavLink></li>
                <li><NavLink to="#" className="hover:text-indigo-300">{link2}</NavLink></li>
                <li><NavLink to="#" className="hover:text-indigo-300">{link3}</NavLink></li>
            </ul>
        </div>
    )
}