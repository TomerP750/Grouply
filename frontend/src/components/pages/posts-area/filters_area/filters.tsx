// Filters.tsx
import { useEffect, useState } from "react";
import { ProjectPosition } from "../../../../dtos/enums/ProjectPosition";
import type { TechnologyDTO } from "../../../../dtos/models_dtos/TechnologyDTO";
import technologyService from "../../../../service/technology_service";
import { toast } from "react-toastify";
import { Accordion } from "../../../elements/Accordion";
import { TechnologySelect } from "./technologies_select";
import { RoleDemandSelect } from "./role_demand_select";

export type FeedFilters = {
  postTitle: string;
  startDate: string;
  roleDemand?: ProjectPosition;
};



export function Filters() {

  return (
    <aside className="lg:sticky top-50 left-0 w-2/3 lg:w-1/4 p-4 rounded-xl 
                       text-slate-900 dark:text-slate-100 
                      shadow-lg space-y-4">

      <div className="flex justify-between">
        <h3 className="text-sm font-semibold tracking-wide mb-5">{'Filter & Sort'.toUpperCase()}</h3>
        <span className="text-sm opacity-50">Clear All</span>
      </div>

      


      <RoleDemandSelect/>

      <TechnologySelect/>


    </aside>
  );
}
