import { useEffect, type ReactNode } from "react";
import { BiX } from "react-icons/bi";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children?: ReactNode;
    width?: string
    height?: string
    className?: string
}

export function Modal({ open, onClose, title, children, width, height, className }: ModalProps) {
    // Early return: no mount when closed
    if (!open) return null;

    // Body scroll lock while open
    useEffect(() => {
        const { overflow } = document.body.style;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = overflow;
        };
    }, []);


    return (
        <div
            className="fixed inset-0 z-50"
            role="dialog"
            aria-modal="true"
        >
            {/* Overlay */}
            <button
                aria-label="Close modal"
                onClick={onClose}
                className="fixed inset-0 bg-black/50 backdrop-blur-[2px]"
            />

            {/* Wrapper */}
            <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
                {/* Panel */}
                <div
                    className={`
                    ${className}
                    pointer-events-auto 
                    relative 
                    w-full sm:w-3/4 md:w-1/2 lg:w-2/3
                    h-[90vh] max-h-[90vh]
                    rounded-2xl bg-white dark:bg-slate-900 shadow-xl
                    ring-1 ring-black/5 dark:ring-white/10
                    p-5 sm:p-6 flex flex-col
                    `}
                >
                    {/* Close (X) */}
                    <button
                        onClick={onClose}
                        className="absolute right-3.5 top-3.5 inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    >
                        <BiX size={20} />
                    </button>

                    {/* Title */}
                    {title && (
                        <h2
                            id="modal-title"
                            className="pr-10 text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100"
                        >
                            {title}
                        </h2>
                    )}



                    {/* Body */}
                    <div className="overflow-y-auto flex-1 scrollbar-thin">{children}</div>
                </div>
            </div>
        </div>
    );
}
