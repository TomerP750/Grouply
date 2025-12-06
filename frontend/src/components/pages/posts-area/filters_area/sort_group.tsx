import { useTranslation } from "react-i18next";
import { useFilters } from "../../../../context/filter_context";
import { Accordion } from "../../../elements/Accordion";

const inputStyle = `
  appearance-none
  w-4 h-4
  rounded-full
  border border-slate-400
  checked:bg-black dark:checked:bg-teal-500
  transition-colors duration-200
  cursor-pointer
`;



export function SortGroup() {

  const { sortDirection , toggleSortDirection } = useFilters();
  const { t } = useTranslation();

  return (
    <Accordion title={t("filters.sort.label")}>
      <ul className="flex flex-col items-center gap-5">


        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            value="DESC"
            checked={sortDirection === "DESC"}
            onChange={toggleSortDirection}
            className={`${inputStyle}`}
          />
          <span className="text-sm text-slate-800 dark:text-slate-200">{t("filters.sort.newest_oldest")}</span>
        </label>

        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            value="ASC"
            checked={sortDirection === "ASC"}
            onChange={toggleSortDirection}
            className={`${inputStyle}`}
          />
          <span className="text-sm text-slate-800 dark:text-slate-200">{t("filters.sort.oldest_newest")}</span>
        </label>

      </ul>
    </Accordion>
  )
}