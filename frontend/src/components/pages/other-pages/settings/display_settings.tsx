import { useTranslation } from "react-i18next";
import { LanguageSelect } from "./language.select";


export function DisplaySettings() {

    const { t } = useTranslation();

    return (
        <form className="p-10 flex flex-col md:flex-row items-center md:items-start px-6 gap-10 overflow-y-auto text-black dark:text-white">
            {/* header */}
            <div className="space-y-2 dark:text-white">
                <p className="font-semibold text-lg">{t("settings.display.title")}</p>
                <p className="text-slate-500 dark:text-gray-400">
                    {t("settings.display.description")}
                </p>
            </div>

            {/* Inputs section */}
            <div className="flex flex-col items-start w-full gap-5">


                <LanguageSelect />


            </div>
        </form>
    )

}