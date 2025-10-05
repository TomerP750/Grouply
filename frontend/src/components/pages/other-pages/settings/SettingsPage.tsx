import { Navbar } from "../../../layout/navbar/Navbar";
import { SettingsPanel } from "./settings_panel";
import { SettingsSidebar } from "./sidebar";



export function SettingsPage() {
    return (
        <div className="bg-slate-900 min-h-screen">
            <Navbar />
            <div className="flex">
                <SettingsSidebar />
                <SettingsPanel />

            </div>
        </div>
    )
}