import { useState } from "react";
import type { ComponentProps } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

type InputProps = ComponentProps<"input"> & {
    label?: string;
    error?: string;
};

export function Input({
    label,
    error,
    type,
    className,
    ...props
}: InputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const isPasswordField = type === "password";

    const resolvedType =
        isPasswordField && showPassword ? "text" : type;

    return (
        <div className="flex flex-col gap-1 w-full">
            {label && (
                <label className="text-sm font-medium text-slate-200">
                    {label}
                </label>
            )}

            <div className="relative w-full">
                <input
                    {...props}
                    type={resolvedType}
                    className={[
                        "w-full rounded-lg border px-3 py-2 text-sm outline-none transition",
                        "bg-slate-900 text-slate-100 border-slate-700",
                        "focus:border-sky-500 focus:ring-1 focus:ring-sky-500",
                        error
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "",
                        isPasswordField ? "pr-10" : "",
                        className ?? "",
                    ].join(" ")}
                />

                {isPasswordField && (
                    <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        className="absolute inset-y-0 right-2 flex items-center text-slate-400 hover:text-slate-200"
                        tabIndex={-1}
                    >
                        {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                )}
            </div>

            {error && <span className="text-sm text-red-500">{error}</span>}
        </div>
    );
}