import { BiMinus, BiPlus } from "react-icons/bi"
import type { FaqModel } from "../pages/Faq"



interface AccordionProps {
    isOpen: boolean
    faq: FaqModel
    onToggle: () => void
}

export function Accordion({ isOpen, faq, onToggle }: AccordionProps) {
    return (
        <div className="flex flex-col items-start cursor-pointer dark:text-white border-b border-gray-500/50 py-2 w-full sm:w-1/2 sm:max-w-1/2 " onClick={onToggle}>
            <div className="flex items-center justify-between w-full">
                <p className="text-base sm:text-lg">{faq.question}</p>
                {isOpen ? <BiMinus size={25}/> : <BiPlus size={25}/>}
            </div>
            {isOpen && <p className="py-2 text-gray-400">{faq.answer}</p>}
        </div>
    )
}