import { useState } from "react";
import type { TechnologyDTO } from "../../../../dtos/models_dtos/technology_dto";

interface TechSelectChipsProps {
    technologies: TechnologyDTO[];
    value: TechnologyDTO[];
    onChange: (next: TechnologyDTO[]) => void;
    label?: string;
    max?: number;
    disabled?: boolean;
}

export function TechSelectChips({ technologies, value, onChange, label = "Technologies", max, disabled }: TechSelectChipsProps) {
    
    const [selectedId, setSelectedId] = useState<number | "">("");

    const add = () => {

        if (!selectedId) return;

        const tech = technologies.find((t) => t.id === Number(selectedId));

        if (!tech) return;

        if (value.some((v) => v.id === tech.id)) return;
        if (max && value.length >= max) return;
        onChange([...value, tech]);
        setSelectedId("");
    };

    const remove = (id: number) => onChange(value.filter((t) => t.id !== id));

    const available = technologies.filter((opt) => !value.some((v) => v.id === opt.id));

    return (
        <div className="w-full">
            {label && (
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                    {label} {max && <span className="text-xs text-gray-500">({value.length}/{max})</span>}
                </label>
            )}

            <div className="flex gap-2">

                <button
                    type="button"
                    onClick={add}
                    disabled={disabled || !selectedId || (max ? value.length >= max : false)}
                    className="cursor-pointer px-3 py-2 rounded-md text-sm bg-sky-600 hover:bg-sky-700 dark:bg-teal-600 text-white
                     dark:hover:bg-teal-700 transition disabled:opacity-50"
                >
                    Add
                </button>
                <select
                    disabled={disabled}
                    value={selectedId}
                    onChange={(e) => setSelectedId(e.target.value ? Number(e.target.value) : "")}
                    className={`appearance-none w-full rounded-lg px-3 py-2 text-sm outline-none transition border
                     bg-indigo-300 dark:bg-slate-800 dark:text-white border-slate-700
                     focus:ring-2 dark:focus:ring-teal-500/40 focus:ring-sky-500 dark:focus:border-teal-500
                     ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                    <option value="">{disabled ? "Loading..." : "Select Technology"}</option>
                    {available.map((opt) => (
                        <option key={opt.id} value={opt.id} className="bg-sky-100 even:bg-sky-200 dark:bg-slate-800">
                            {opt.name}
                        </option>
                    ))}
                </select>

                
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
                {value.map((t) => (
                    <span
                        key={t.id}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium
                       bg-teal-600/15 text-teal-500 border border-teal-500/30"
                    >
                        {t.name}
                        <button
                            type="button"
                            onClick={() => remove(t.id)}
                            className="ml-1 rounded-full px-1.5 text-teal-500 hover:bg-teal-500/10"
                            aria-label={`Remove ${t.name}`}
                        >
                            ✕
                        </button>
                    </span>
                ))}
                {value.length === 0 && !disabled && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">No technologies selected</span>
                )}
            </div>
        </div>
    );
}
