import { Accordion } from "../../../elements/Accordion";

const inputStyle = `
  appearance-none
  w-4 h-4
  rounded-full
  border border-slate-400
  checked:border-teal-500 checked:bg-teal-500
  transition-colors duration-200
  cursor-pointer
`;


interface SortGroupProps {

}

export function SortGroup() {
    return (
        <Accordion title="Sort By">
        <ul className="flex flex-col items-start gap-5">
          

          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="sort"
              value="newest"
              defaultChecked
              className={`${inputStyle}`}
            />
            <span className="text-sm text-slate-800 dark:text-slate-200">Newest - Oldest</span>
          </label>

          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="sort"
              value="newest"
              className={`${inputStyle}`}
            />
            <span className="text-sm text-slate-800 dark:text-slate-200">Oldest - Newest</span>
          </label>

        </ul>
      </Accordion>
    )
}