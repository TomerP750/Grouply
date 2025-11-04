import { BiCalendar } from "react-icons/bi";
import type { ProjectDTO } from "../../../dtos/models_dtos/ProjectDTO";
import { fmtDate } from "../../../util/util_functions";
import { StatusBadge } from "../../../util/ui_helper";
import { technologyIconMap } from "../../../util/technology_icon_mapper";


export function ProfileProjectCard({ project }: { project: ProjectDTO }) {
  const { name, createdAt, status, technologies } = project;

  return (
    <div
      className="w-100 aspect-square rounded-2xl border border-slate-200 dark:border-slate-700
                 bg-white dark:bg-slate-900 shadow-sm hover:shadow-lg hover:-translate-y-1
                 transition-all duration-200 flex flex-col p-5"
    >
      {/* Top Section */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1 truncate max-w-[180px]">
            {name}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 inline-flex items-center gap-1">
            <BiCalendar size={18} />
            {fmtDate(createdAt)}
          </p>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Technology Icons */}
      <ul className="flex flex-wrap items-center gap-3">
        {technologies?.map((t) => {
          const Icon = technologyIconMap[t.slug] ?? null;

          return (
            <li
              key={t.id}
              className="flex items-center gap-2 bg-slate-700 text-white font-medium dark:bg-slate-700/30 dark:text-slate-300 px-3 py-1 rounded-full text-sm"
            >
              {Icon && <Icon color={t.color ?? "#38bdf8"} size={18} />}
              <span>{t.name}</span>
            </li>
          );
        })}
      </ul>



    </div>
  );
}
