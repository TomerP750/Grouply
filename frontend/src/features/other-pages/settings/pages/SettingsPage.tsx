import { SettingsPanel } from "./settings_panel";
import { SettingsSidebar } from "../components/sidebar";



export function SettingsPage() {
    return (
        <div className=" min-h-screen bg-linear-to-r dark:from-stone-900 dark:to-stone-950 from-neutral-100 to-neutral-200">
           
            <div className="flex">
                <SettingsSidebar />
                <SettingsPanel />

            </div>
        </div>
    )
}