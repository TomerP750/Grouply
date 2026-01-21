import { useEffect } from "react";
import {
  BiX,
  BiErrorCircle,
  BiErrorAlt,
} from "react-icons/bi";

export type DialogType = "danger" | "warning";

interface DialogProps {
  open: boolean;
  title?: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
  type: DialogType;
  confirmLabel?: string;
  cancelLabel?: string;
}

const typeConfig = {
  danger: {
    Icon: BiErrorCircle,
    badgeBg: "bg-red-600",
    accentText: "text-red-200",
    primaryBtn:
      "bg-red-600 hover:bg-red-500 focus:ring-red-500/60",
  },
  warning: {
    Icon: BiErrorAlt,
    badgeBg: "bg-amber-500",
    accentText: "text-amber-200",
    primaryBtn:
      "bg-amber-500/80 hover:bg-amber-600/80 focus:ring-amber-400/60",
  },
} as const;

export function Dialog({
  open,
  title = "Confirm action",
  message,
  onClose,
  onConfirm,
  type,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
}: DialogProps) {

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const cfg = typeConfig[type] ?? typeConfig.danger;
  const { Icon, badgeBg, accentText, primaryBtn } = cfg;


  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />

      {/* Dialog */}
      <main
        className="dialog relative z-10 w-[26rem] max-w-full
                   rounded-2xl bg-slate-900/95 border border-white/10
                   shadow-2xl px-6 pt-10 pb-6
                   flex flex-col gap-4"
      >
        {/* Icon badge */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-full ${badgeBg}
                        shadow-xl ring-4 ring-slate-950`}
          >
            <Icon size={32} className="text-white" />
          </div>
        </div>

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <h2 className={`text-lg font-semibold text-white ${accentText}`}>
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 rounded-full
                       p-1.5 hover:bg-slate-800 transition"
            aria-label="Close dialog"
          >
            <BiX size={20} />
          </button>
        </div>

        {/* Message */}
        <p className="text-sm text-slate-300">{message}</p>

        {/* Actions */}
        <div className="mt-3 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="cursor-pointer px-3 py-1.5 rounded-md
                       bg-slate-700 hover:bg-slate-600
                       text-slate-200 text-sm
                       transition focus:outline-none
                       focus:ring-2 focus:ring-slate-400/60"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`cursor-pointer px-3 py-1.5 rounded-md text-white text-sm
                        transition focus:outline-none focus:ring-2 ${primaryBtn}`}
          >
            {confirmLabel}
          </button>
        </div>
      </main>
    </div>
  );
}
