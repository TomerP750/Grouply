import { ProjectPosition } from "../../../../dtos/enums/ProjectPosition"
import { toNormal } from "../../../../util/util_functions"
import { Accordion } from "../../../elements/Accordion"
import "./filters.css"

export function RoleDemandSelect() {
    return (
        <Accordion title="Role Demand">
            <label className="role-select py-2 flex flex-col items-center h-40 overflow-y-auto gap-3 text-sm">
                {Object.values(ProjectPosition).map(pp => {
                    return <div className="cursor-pointer py-2 
                    border border-white/40 w-4/5 text-center">{toNormal(pp)}</div>
                })}
            </label>
        </Accordion>
    )
}