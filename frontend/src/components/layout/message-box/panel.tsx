import type { ReactNode } from "react";
import { BiX } from "react-icons/bi";

type PanelProps = {
  children: ReactNode;
  onClose: () => void;
  title?: string;
};

export function Panel({ children, onClose, title }: PanelProps) {
  return (
    <div
      className="w-[22rem] sm:w-[24rem] h-[28rem]
                 bg-white dark:bg-slate-900 shadow-2xl rounded-2xl
                 flex flex-col overflow-hidden"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center gap-2 p-3 border-b dark:border-slate-800">
        <h3 className="font-semibold text-lg flex-1">{title ?? "Messages"}</h3>
        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Close"
        >
          <BiX size={22} />
        </button>
      </div>
      {children}
    </div>
  );
}
