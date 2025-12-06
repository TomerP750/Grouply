import { useTranslation } from "react-i18next";
import { BiFilter } from "react-icons/bi";
import { useFilters } from "../../../../context/filter_context";
import { useBodyScrollLock } from "../../../../util/helper_hooks";
import "./filters.css";
import { RoleDemandSelect } from "./role_demand_select";
import { SortGroup } from "./sort_group";
import { TechnologySelect } from "./technologies_select";

interface MobileFiltersProps {
    open: boolean;
    onClose: () => void;
}

export function MobileFilters({ onClose, open }: MobileFiltersProps) {

    const { clear, empty } = useFilters();
    const { t } = useTranslation();

    useBodyScrollLock(open);

    return (
        <div className="fixed inset-0 z-50 flex">

            {/* Full-screen panel */}
            <div className="relative h-full w-full bg-slate-900 text-white p-4 shadow-xl">

                {/* Header and close button */}
                <header className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <button
                        onClick={onClose}
                        className="text-sm cursor-pointer underline underline-offset-2"
                    >
                        Close
                    </button>
                </header>

                <section className="h-[calc(100vh-4rem)] overflow-y-auto">
                    <div className="cursor-pointer flex justify-between items-start w-full max-w-md mx-auto mb-10">
                        <h2
                            className={`text-sm font-semibold tracking-wide ${open ? "mb-5" : ""
                                } inline-flex gap-1 items-center`}
                        >
                            <BiFilter size={22} />
                            <span>{t("filters.header.title").toUpperCase()}</span>
                        </h2>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                clear();
                            }}
                            className={`${empty
                                    ? "cursor-not-allowed opacity-50"
                                    : "cursor-pointer hover:underline hover:underline-offset-2"
                                } text-sm`}
                        >
                            {t("filters.header.clear")}
                        </button>
                    </div>

                    <div className="space-y-4 w-full max-w-md sm:max-w-lg mx-auto">
                        <SortGroup />
                        <RoleDemandSelect />
                        <TechnologySelect />
                    </div>
                </section>


            </div>
        </div>
    );

}