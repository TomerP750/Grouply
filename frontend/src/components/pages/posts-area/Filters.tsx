// Filters.tsx
import type { ProjectPosition } from "../../../dtos/enums/ProjectPosition";

export type FeedFilters = {
  postTitle: string;
  startDate: string;            
  roleDemand?: ProjectPosition; 
};

type FiltersProps = {
  value: FeedFilters;
  setValue: React.Dispatch<React.SetStateAction<FeedFilters>>;
};

export function Filters({ value, setValue }: FiltersProps) {
  
  const setPostTitle = (v: string) =>
    setValue(prev => ({ ...prev, postTitle: v }));

  const setStartDate = (v: string) =>
    setValue(prev => ({ ...prev, startDate: v }));

  const setRoleDemand = (v?: ProjectPosition) =>
    setValue(prev => ({ ...prev, roleDemand: v }));

  return (
    <aside className="lg:sticky top-50 left-0 w-2/3 lg:w-1/4 p-4 rounded-xl 
                      bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 
                      shadow-lg space-y-4">
      <h3 className="text-sm font-semibold tracking-wide mb-2">Filters</h3>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">Post Title</span>
        <input
          type="search"
          value={value.postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          placeholder="Enter post title..."
          className="rounded-md border border-slate-300 dark:border-slate-600 
                     bg-white dark:bg-slate-700 px-3 py-2 text-sm 
                     focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">Start Date</span>
        <input
          type="date"
          value={value.startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="rounded-md border border-slate-300 dark:border-slate-600 
                     bg-white dark:bg-slate-700 px-3 py-2 text-sm 
                     focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">Role Demand</span>
        <select
          value={value.roleDemand ?? ""}
          onChange={(e) => setRoleDemand(e.target.value ? (e.target.value as ProjectPosition) : undefined)}
          className="rounded-md border border-slate-300 dark:border-slate-600 
                     bg-white dark:bg-slate-700 px-3 py-2 text-sm 
                     focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="">Any Role</option>
          <option value="BACKEND">Backend</option>
          <option value="FRONTEND">Frontend</option>
          <option value="FULLSTACK">Full Stack</option>
        </select>
      </label>
    </aside>
  );
}
