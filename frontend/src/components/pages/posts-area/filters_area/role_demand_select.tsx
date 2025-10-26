import { useFilters } from "../../../../context/filter_context"
import { ProjectPosition } from "../../../../dtos/enums/ProjectPosition"
import { toNormal } from "../../../../util/util_functions"
import { Accordion } from "../../../elements/Accordion"
import "./filters.css"

export function RoleDemandSelect() {

    const { add, remove, roles } = useFilters();

    const isSelected = (position: ProjectPosition) => {
        return roles.includes(position);
    }


    const toggle = (position: ProjectPosition) => {
        if (isSelected(position)) remove(position);
        else add(position); 
    }


    return (
        <Accordion title="Role Demand">
            <label className="role-select py-2 flex flex-col items-center h-62 overflow-y-auto gap-3 text-sm">
                {Object.values(ProjectPosition).map(pp => {
                    return <div
                        key={pp}
                        onClick={() => toggle(pp)}
                        className={`${isSelected(pp) && 'bg-white text-black'} cursor-pointer py-2 border border-white/40 w-4/5 text-center`}>{toNormal(pp)}</div>
                })}
            </label>
        </Accordion>
    )
}