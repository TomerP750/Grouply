import { BiCalendar } from "react-icons/bi";
import type { ProjectDTO } from "../../../../dtos/models_dtos/project_dto";
import { technologyIconMap } from "../../../../util/technology_icon_mapper";
import { StatusBadge } from "../../../../util/ui_helper";
import { fmtDate } from "../../../../util/util_functions";

export function ProfileProjectCard({ project }: { project: ProjectDTO }) {
  const { name, createdAt, status, technologies } = project;

  return (
    <article
      className="
        group relative flex flex-col rounded-2xl w-100
        border border-slate-200/70 dark:border-slate-700/70
        bg-gradient-to-br from-white via-slate-50 to-slate-100
        dark:from-slate-900 dark:via-slate-900/70 dark:to-slate-950
        shadow-sm hover:shadow-xl hover:-translate-y-1
        transition-all duration-200
        p-5
      "
    >
      {/* Top accent bar */}
      <div
        className="
          pointer-events-none absolute inset-x-0 top-0 h-1
          bg-gradient-to-r from-teal-400 via-sky-400 to-indigo-500
          opacity-70 group-hover:opacity-100
          transition-opacity duration-200
        "
      />

      {/* Content */}
      <div className="flex items-start justify-between gap-3 mb-4">
        {/* Title + date */}
        <div className="min-w-0">
          <h3
            className="
              text-base md:text-lg font-semibold tracking-tight
              text-slate-900 dark:text-slate-100
              line-clamp-2
            "
          >
            {name}
          </h3>

          <p
            className="
              mt-1 text-xs md:text-sm text-slate-500 dark:text-slate-400
              inline-flex items-center gap-1
            "
          >
            <BiCalendar size={16} className="shrink-0" />
            <span>{fmtDate(createdAt)}</span>
          </p>
        </div>

        {/* Status */}
        <div className="shrink-0">
          <StatusBadge status={status} />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-slate-200/70 dark:bg-slate-700/60 mb-3" />

      {/* Tech header */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Tech stack
        </span>
        {technologies && technologies.length > 0 && (
          <span className="text-[11px] text-slate-400 dark:text-slate-500">
            {technologies.length}{" "}
            {technologies.length === 1 ? "technology" : "technologies"}
          </span>
        )}
      </div>

      {/* Technology chips */}
      {technologies && technologies.length > 0 ? (
        <ul
          className="
            flex flex-wrap gap-2
            mt-1
          "
        >
          {technologies.map((t) => {
            const Icon = technologyIconMap[t.slug] ?? null;

            return (
              <li
                key={t.id}
                className="
                  inline-flex items-center gap-2
                  rounded-full px-3 py-1
                  text-xs md:text-sm
                  bg-slate-100/90 text-slate-800
                  dark:bg-slate-800/70 dark:text-slate-100
                  border border-slate-200/60 dark:border-slate-700/70
                  group-hover:bg-slate-100 dark:group-hover:bg-slate-800
                  transition-colors duration-150
                "
              >
                {Icon && (
                  <Icon
                    size={16}
                    color={t.color ?? "#38bdf8"}
                    className="shrink-0"
                  />
                )}
                <span className="truncate max-w-[120px] md:max-w-[160px]">
                  {t.name}
                </span>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500 italic">
          No technologies tagged yet.
        </p>
      )}
    </article>
  );
}
