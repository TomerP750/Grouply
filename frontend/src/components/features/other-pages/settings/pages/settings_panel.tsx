import { Outlet } from "react-router-dom";

export function SettingsPanel() {
    return (
        <div className="flex-1 ring-1 ring-gray-500/50 rounded-xl">
            <Outlet/>
        </div>
    )
}