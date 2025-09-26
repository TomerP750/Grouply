import type { ReactNode } from "react"

interface InputProps {
    label?: string
    error?: string
    children: ReactNode
}

export function Input({ label, children, error }: InputProps) {
    return (
        <div className="flex flex-col gap-1 w-full">
            <label className="text-sm font-medium text-slate-200">{label}</label>
            {children}
            {error && <span className="text-sm text-red-500">{error}</span>}
        </div>
    )
}