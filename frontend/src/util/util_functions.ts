
export function toTitleCase(str: string): string {
  if (!str) return "";

  return str
    .toLowerCase()
    .split(" ")
    .filter(word => word.trim().length > 0)
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}


export function formatRelative(ts: number) {
  const mins = Math.max(1, Math.round((Date.now() - ts) / 60000));
  if (mins < 60) return `${mins}m`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.round(hrs / 24);
  return `${days}d`;
}



export function fmtDate(v: unknown) {
    const d = v instanceof Date ? v : new Date(String(v));
    return isNaN(d.getTime()) ? "-" : d.toLocaleDateString();
}


export function toNormal(str: string) {
  const s = str.toLowerCase().replace(/_/g, " ");
  return s.charAt(0).toUpperCase() + s.slice(1);
}



import { SiReact, SiSpringboot, SiTypescript, SiPython, SiJavascript, SiMongodb } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import type { IconType } from "react-icons";

export const technologyIconMap: Record<string, IconType> = {
  react: SiReact,
  "spring-boot": SiSpringboot,
  typescript: SiTypescript,
  javascript: SiJavascript,
  java: FaJava,
  python: SiPython,
  mongodb: SiMongodb,
};
