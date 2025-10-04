import { BiX } from "react-icons/bi";
import { useEffect } from "react";

interface DialogProps {
  open: boolean;
  title?: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
}

export function Dialog({ open, title = "Confirm Action", message, onClose, onConfirm }: DialogProps) {
  
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Dialog box */}
      <main
        role="dialog"
        className="relative z-10 w-[26rem] max-w-[90vw] rounded-xl bg-slate-800 p-6 shadow-lg border border-white/10 
                   transform transition-all duration-300 scale-100 opacity-100"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
            <BiX size={22} />
          </button>
        </div>

        {/* Message */}
        <p className="text-slate-300 mb-5">{message}</p>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1.5 rounded-md bg-red-600 hover:bg-red-500 text-white transition"
          >
            Delete
          </button>
        </div>
      </main>
    </div>
  );
}
