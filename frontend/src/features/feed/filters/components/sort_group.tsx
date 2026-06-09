import { useTranslation } from "react-i18next";
import { Accordion } from "../../../components/shared/ui/Accordion";
import { useProjectFilters } from "./hooks/useProjectFilters";
import type { Direction } from "../models/Direction";

const inputStyle = `
  appearance-none
  w-4 h-4
  rounded-full
  border-2 border-black
  checked:bg-black dark:checked:bg-sky-500
  transition-colors duration-200
  cursor-pointer
`;



export function SortGroup() {

  const { dir, updateFilters } = useProjectFilters();

  const { t } = useTranslation();

  const handleSortChange = (newDir: Direction) => {
    updateFilters({
      dir: newDir,
      page: "0"
    });
  };

  return (
    <Accordion title={t("filters.sort.label")}>
      <ul className="flex flex-col items-center gap-5">


        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            value="DESC"
            checked={dir === "desc"}
            onChange={() => handleSortChange("desc")}
            className={`${inputStyle}`}
          />
          <span className="text-sm text-slate-800 dark:text-slate-200">{t("filters.sort.newest_oldest")}</span>
        </label>

        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            value="ASC"
            checked={dir === "asc"}
            onChange={() => handleSortChange("asc")}
            className={`${inputStyle}`}
          />
          <span className="text-sm text-slate-800 dark:text-slate-200">{t("filters.sort.oldest_newest")}</span>
        </label>

      </ul>
    </Accordion>
  )
}