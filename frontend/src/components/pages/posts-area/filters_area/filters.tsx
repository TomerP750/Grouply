// Filters.tsx
import { BiFilter } from "react-icons/bi";
import { ProjectPosition } from "../../../../dtos/enums/ProjectPosition";
import { Hr } from "../../../elements/Hr";
import { RoleDemandSelect } from "./role_demand_select";
import { SortGroup } from "./sort_group";
import { TechnologySelect } from "./technologies_select";
import { useFilters } from "../../../../context/filter_context";
import { useState } from "react";

export type FeedFilters = {
  postTitle: string;
  startDate: string;
  roleDemand?: ProjectPosition;
};



export function Filters() {

  const [open, setOpen] = useState<boolean>(true);

  const { clear, empty } = useFilters();

  return (
    <aside className="hidden lg:block lg:top-10 w-2/3 lg:w-1/4 p-4 rounded-xl overflow-y-auto min-h-screen
                       text-slate-900 dark:text-slate-100 scroll-smooth
                      shadow-lg space-y-4">

      <div onClick={() => setOpen(!open)} className="cursor-pointer flex justify-between items-start">
        <div className={`text-sm font-semibold tracking-wide ${open && 'mb-5'} inline-flex gap-1 items-center`}>
          <BiFilter size={22} />
          <span>{'Filter & Sort'.toUpperCase()}</span>
        </div>
        <button onClick={(e) => {
          e.stopPropagation();
          clear()
        }} 
        className={`${empty ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:underline hover:underline-offset-2'} text-sm`}>Clear All</button>
      </div>

      {open && <div>
        <Hr />

        <SortGroup />

        <Hr />

        <RoleDemandSelect />

        <Hr />

        <TechnologySelect />
      </div>}

    </aside>

  );
}
