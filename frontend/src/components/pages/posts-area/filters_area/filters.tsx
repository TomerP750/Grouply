import { useState } from "react";
import { BiFilter } from "react-icons/bi";
import { useFilters } from "../../../../context/filter_context";
import { Hr } from "../../../elements/Hr";
import { MobileFilters } from "./mobile_filters";
import { RoleDemandSelect } from "./role_demand_select";
import { SortGroup } from "./sort_group";
import { TechnologySelect } from "./technologies_select";
import type { PostDTO } from "../../../../dtos/models_dtos/post_dto";


interface FiltersProps {
  onFilterChange: () => void;
  posts: PostDTO[]
}

export function Filters({ onFilterChange, posts }: FiltersProps) {

  const [open, setOpen] = useState(true);
  const { clear, empty } = useFilters();

  return (
    
    <aside className="hidden lg:block lg:sticky top-10 w-72 shrink-0">
      
      <div className="lg:sticky lg:top-10 h-[calc(100vh-2rem)] overflow-y-auto
                      px-4 py-4 rounded-xl text-slate-900 dark:text-slate-100
                      shadow-lg space-y-4 min-h-0">

        <div onClick={() => setOpen(!open)} className="cursor-pointer flex justify-between items-start">
          
          <h2 className={`text-sm font-semibold tracking-wide ${open ? 'mb-5' : ''} inline-flex gap-1 items-center`}>
            <BiFilter size={22} />
            <span>{'Filter & Sort'.toUpperCase()}</span>
          </h2>
          <button
            onClick={(e) => { 
              e.stopPropagation(); 
              clear(); 
            }}
            className={`${empty ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:underline hover:underline-offset-2'} text-sm`}
          >
            Clear All
          </button>
        </div>

        {open && (
          <div>
            <Hr />
            <SortGroup />
            <Hr />
            <RoleDemandSelect onFilterChange={onFilterChange}/>
            <Hr />
            <TechnologySelect />
          </div>
        )}

        <div className="lg:hidden">
          <MobileFilters />
        </div>

      </div>
    </aside>
  );
}
