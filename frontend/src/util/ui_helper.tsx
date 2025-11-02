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