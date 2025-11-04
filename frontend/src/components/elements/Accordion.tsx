import { useState, type ReactNode } from "react"
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { Hr } from "./Hr";

interface AccordionProps {
    children: ReactNode
    title?: string
}

export function Accordion({ children, title }: AccordionProps) {

    const [open, setOpen] = useState<boolean>(true);

    return (
        <div className="">
            
            <button onClick={() => setOpen(!open)} className={`cursor-pointer w-full inline-flex justify-between items-center ${open && `mb-5`}`}>
                <p className="text-xs uppercase tracking-wider text-slate-100 font-semibold mb-2">{title}</p>
                <span className={`${open && 'rotate-180'} transition-all duration-300`}>{<BiChevronDown size={22}/>}</span>
            </button>

            {open && children}

           
        </div>
    )
}