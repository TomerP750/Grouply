import type { IconType } from "react-icons";
import { Hr } from "../../../elements/Hr";


interface DashboardStatCardProps {
    Icon: IconType
    label: string;
    value: number;
    color: string;
}

export function DashboardStatCard({ Icon, label, value, color }: DashboardStatCardProps) {
    return (
        <div className="bg-gray-200 dark:bg-slate-900/80 space-y-3 aspect-square rounded-xl p-6 shadow-md flex flex-col items-start justify-start border border-slate-800">
            <div className="flex items-center gap-4">
                <p>{<Icon size={40} className={`${color}`} />}</p>
                <p className={`${color} text-lg`}>{label}</p>
            </div>

            <Hr />

            <h2 className={`text-6xl border-2  p-5 rounded-full aspect-square inline-flex items-center justify-center font-bold mt-1 ${color}`}>{value}</h2>


        </div>
    );
}