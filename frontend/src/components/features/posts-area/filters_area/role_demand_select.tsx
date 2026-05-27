import { useTranslation } from "react-i18next"
import { ProjectPosition } from "../../../../dtos/enums/ProjectPosition"
import { toNormal } from "../../../../util/util_functions"
import { Accordion } from "../../../shared/Accordion"
import "./filters.css"



// export function RoleDemandSelect() {

//     const { roles, updateFilters } = useProjectFilters();

//     const { t } = useTranslation();

//     const toggleRole = (role: ProjectPosition) => {
//         const nextRoles = roles.includes(role)
//             ? roles.filter((r) => r !== role)
//             : [...roles, role];

//         // Update roles AND reset page in one single URL transition
//         updateFilters({
//             roles: nextRoles,
//             page: "0"
//         });
//     };


//     return (
//         <Accordion title={t("filters.roleDemand.label")}>
//             <label className="role-select py-2 flex flex-col items-center h-62 overflow-y-auto gap-3 text-sm">
//                 {Object.values(ProjectPosition).map(pp => {
//                     return <div
//                         key={pp}
//                         onClick={() => toggleRole(pp)}
//                         className={`${roles.includes(pp) && 'bg-black text-white dark:bg-white dark:text-black'} cursor-pointer py-2 border border-black dark:border-white/40 w-4/5 text-center transition-colors duration-200`}>{toNormal(pp)}</div>
//                 })}
//             </label>
//         </Accordion>
//     )
// }