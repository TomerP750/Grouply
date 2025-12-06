import { useState } from "react";
import { BiFilter } from "react-icons/bi";
import { useFilters } from "../../../../context/filter_context";
import { Hr } from "../../../elements/Hr";
import { MobileFilters } from "./mobile_filters";
import { RoleDemandSelect } from "./role_demand_select";
import { SortGroup } from "./sort_group";
import { TechnologySelect } from "./technologies_select";
import { useTranslation } from "react-i18next";



export function Filters() {

  const [open, setOpen] = useState(true);
  const [moblieFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);
  const { clear, empty } = useFilters();
  const { t } = useTranslation();

  console.log("filters mobile: ", moblieFiltersOpen);
  

  return (
    <>
      <aside className="hidden lg:block lg:sticky top-10 w-72 shrink-0 shadow-md">

        <div className="lg:sticky lg:top-10 h-[calc(100vh-2rem)] overflow-y-auto
                      px-4 py-4 rounded-xl text-slate-900 dark:text-slate-100
                      shadow-lg space-y-4 min-h-0">

          <div onClick={() => setOpen(!open)} className="cursor-pointer flex justify-between items-start">

            <h2 className={`text-sm font-semibold tracking-wide ${open ? 'mb-5' : ''} inline-flex gap-1 items-center`}>
              <BiFilter size={22} />
              <span>{t('filters.header.title').toUpperCase()}</span>
            </h2>
            <button
              onClick={(e) => {
                e.stopPropagation();
                clear();
              }}
              className={`${empty ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:underline hover:underline-offset-2'} text-sm`}
            >
              {t("filters.header.clear")}
            </button>
          </div>

          {open && (
            <div>
              <Hr />
              <SortGroup />
              <Hr />
              <RoleDemandSelect />
              <Hr />
              <TechnologySelect />
            </div>
          )}

        </div>

      </aside>

      {/* Mobile filters button */}
      {!moblieFiltersOpen && <div className="lg:hidden fixed bottom-22 left-5 ">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="inline-flex gap-1 items-center rounded-full p-4 
          bg-sky-500 hover:bg-sky-600 hover:scale-110 
          transition-all duration-200 cursor-pointer text-white">
          <BiFilter size={25} />
        </button>
      </div>}

      {moblieFiltersOpen && <MobileFilters onClose={() => setMobileFiltersOpen(false)} open={moblieFiltersOpen} />}

    </>
  );
}
