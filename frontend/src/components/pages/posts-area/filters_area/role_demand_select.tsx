import { useFilters } from "../../../../context/filter_context"
import { ProjectPosition } from "../../../../dtos/enums/ProjectPosition"
import { toNormal } from "../../../../util/util_functions"
import { Accordion } from "../../../elements/Accordion"
import "./filters.css"

export function RoleDemandSelect() {

    const { addRole, removeRole, roles } = useFilters();

    const isSelected = (position: ProjectPosition) => {
        return roles.includes(position);
    }


    const toggle = (position: ProjectPosition) => {
        if (isSelected(position)) removeRole(position);
        else addRole(position); 
    }


    return (
        <Accordion title="Role Demand">
            <label className="role-select py-2 flex flex-col items-center h-62 overflow-y-auto gap-3 text-sm">
                {Object.values(ProjectPosition).map(pp => {
                    return <div
                        key={pp}
                        onClick={() => toggle(pp)}
                        className={`${isSelected(pp) && 'bg-black text-white dark:bg-white dark:text-black'} cursor-pointer py-2 border border-black dark:border-white/40 w-4/5 text-center`}>{toNormal(pp)}</div>
                })}
            </label>
        </Accordion>
    )
}