import { ProjectStatus } from "../dtos/enums/ProjectStatus";
import { Role } from "../dtos/enums/Role";
import { toNormal } from "./util_functions";

export function RoleBadge({ role }: { role: Role }) {
  let styles = "bg-slate-500/15 text-slate-400";
  switch (role) {
    case Role.USER:
      styles = "bg-teal-600/15 text-teal-500";
      break;
    case Role.ADMIN:
      styles = "bg-amber-500/15 text-amber-500";
      break;
    case Role.RECRUITER:
      styles = "bg-purple-500/15 text-purple-400";
      break;
  }
  return <span className={`text-xs px-2 py-1 rounded-full font-medium ${styles}`}>{role}</span>;
}


export function StatusBadge({ status }: { status: ProjectStatus }) {
  let styles = "bg-slate-500/15 text-slate-400";
  switch (status) {
    case ProjectStatus.IN_PROGRESS:
      styles = "bg-teal-600/15 text-teal-500";
      break;
    case ProjectStatus.PREPARATION:
      styles = "bg-amber-500/15 text-amber-500";
      break;
    case ProjectStatus.COMPLETED:
      styles = "bg-green-500/15 text-green-500";
      break;
  }
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${styles}`}>
      {toNormal(status)}
    </span>
  );
}



export function getGradeColor(grade: number): string {
  if (!Number.isFinite(grade)) {
    return "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
  }

  const g = Math.max(0, Math.min(100, Math.round(grade)));

  if (g >= 90) return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300";
  if (g >= 80) return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";        
  if (g >= 70) return "bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-300";          
  if (g >= 60) return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";        
  if (g >= 50) return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";     

  return "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300";                         
}
