import { useTranslation } from "react-i18next"
import { useFilters } from "../../../../context/filter_context"
import { ProjectPosition } from "../../../../dtos/enums/ProjectPosition"
import { toNormal } from "../../../../util/util_functions"
import { Accordion } from "../../../elements/Accordion"
import "./filters.css"



export function RoleDemandSelect() {

    const { addRole, removeRole, selectedRoles } = useFilters();

    const { t } = useTranslation();

    const isSelected = (position: ProjectPosition) => {
        return selectedRoles.includes(position);
    }


    const toggle = (position: ProjectPosition) => {

        if (isSelected(position)) {
            removeRole(position)
        } else { 
            addRole(position) 
        };  
    }


    return (
        <Accordion title={t("filters.roleDemand.label")}>
            <label className="role-select py-2 flex flex-col items-center h-62 overflow-y-auto gap-3 text-sm">
                {Object.values(ProjectPosition).map(pp => {
                    return <div
                        key={pp}
                        onClick={() => toggle(pp)}
                        className={`${isSelected(pp) && 'bg-black text-white dark:bg-white dark:text-black'} cursor-pointer py-2 border border-black dark:border-white/40 w-4/5 text-center transition-colors duration-200`}>{toNormal(pp)}</div>
                })}
            </label>
        </Accordion>
    )
}