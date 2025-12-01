import { LanguageSelect } from "./language.select";

const languages = ["english", "hebrew"];

export function DisplaySettings() {

    return (
        <form className="p-10 flex flex-col md:flex-row items-center md:items-start px-6 gap-10 overflow-y-auto text-black dark:text-white">
                        {/* header */}
                        <div className="space-y-2 dark:text-white">
                            <p className="font-semibold text-lg">Display Settings</p>
                            <p className="text-slate-500 dark:text-gray-400">Settings for display information</p>
                        </div>
        
                        {/* Inputs section */}
                        <div className="flex flex-col items-start w-full gap-5">
        
                            
                            <LanguageSelect/>
                           
        
                        </div>
                    </form>
    )

}