import { useState } from "react";
import { ProjectPosition } from "../../../dtos/enums/ProjectPosition";
import { BiX } from "react-icons/bi";
import { toNormal } from "../../../util/util_functions";

interface PositionSelectChipsProps {
    value: ProjectPosition[];
    onChange: (next: ProjectPosition[]) => void;
    label?: string;
    max?: number;
    disabled?: boolean;
}

export function PositionSelectChips({
    value,
    onChange,
    label = "Positions Needed",
    max,
    disabled
}: PositionSelectChipsProps) {

    const [selectedPos, setSelectedPos] = useState<ProjectPosition | "">("");

    const add = () => {
        if (!selectedPos) return;
        if (max && value.length >= max) return;
        onChange([...value, selectedPos]);
        setSelectedPos("");
    };

    const remove = (idx: number) => onChange(value.filter((_, i) => i !== idx));

    const available = Object.values(ProjectPosition);

    return (
        <div className="w-full">
            {label && (
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                    {label} {max && <span className="text-xs text-gray-500">({value.length}/{max})</span>}
                </label>
            )}

            <div className="flex gap-2">
                <select
                    disabled={disabled}
                    value={selectedPos}
                    onChange={(e) => setSelectedPos(e.target.value as ProjectPosition || "")}
                    className={`w-full rounded-lg px-3 py-2 text-sm outline-none transition border
                     bg-slate-200 dark:bg-slate-800 dark:text-white border-slate-700
                     focus:ring-2 focus:ring-teal-500/40 focus:border-sky-500 dark:focus:border-teal-500
                     ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                    <option value="" className="font-medium bg-sky-100 dark:bg-slate-800">{disabled ? "Loading..." : "Select Position"}</option>
                    {available.map((pos) => (
                        <option key={pos} value={pos} className="font-medium bg-sky-100 dark:bg-slate-800 dark:even:bg-slate-700 even:bg-sky-200">
                            {toNormal(pos)}
                        </option>
                    ))}
                </select>

                <button
                    type="button"
                    onClick={add}
                    disabled={disabled || !selectedPos || (max ? value.length >= max : false)}
                    className="px-3 py-2 rounded-md text-sm bg-sky-500 dark:bg-teal-600 text-white
                     hover:bg-sky-600 dark:hover:bg-teal-700 transition disabled:opacity-50"
                >
                    Add
                </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
                {value.map((pos, idx) => (
                    <span
                        key={`${pos}-${idx}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium
                        text-blue-600
                 dark:bg-teal-600/15 dark:text-teal-500 border dark:border-teal-500/30"
                    >
                        {pos}
                        <button
                            type="button"
                            onClick={() => remove(idx)}
                            className="ml-1 rounded-full text-blue-500 dark:text-teal-500 dark:hover:bg-teal-500/10"
                            aria-label={`Remove ${pos} #${idx + 1}`}
                        >
                            <BiX size={20}/>
                        </button>
                    </span>
                ))}
            </div>

        </div>
    );
}
