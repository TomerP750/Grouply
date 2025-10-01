export function Filters() {
  
  
  return (
    <aside className="lg:sticky top-50 left-6 w-2/3 lg:w-1/4 p-4 rounded-xl 
                      bg-slate-100 dark:bg-slate-800 
                      text-slate-900 dark:text-slate-100 
                      shadow-lg space-y-4">
      <h3 className="text-sm font-semibold tracking-wide mb-2">Filters</h3>

      {/* Project name */}
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">Project Name</span>
        <input
          type="search"
          placeholder="Enter project name..."
          className="rounded-md border border-slate-300 dark:border-slate-600 
                     bg-white dark:bg-slate-700 
                     px-3 py-2 text-sm 
                     focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </label>

      {/* Start date */}
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">Start Date</span>
        <input
          type="date"
          className="rounded-md border border-slate-300 dark:border-slate-600 
                     bg-white dark:bg-slate-700 
                     px-3 py-2 text-sm 
                     focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </label>

      {/* Role demand */}
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">Role Demand</span>
        <select
          className="rounded-md border border-slate-300 dark:border-slate-600 
                     bg-white dark:bg-slate-700 
                     px-3 py-2 text-sm 
                     focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="">Any Role</option>
          <option value="backend">Backend</option>
          <option value="frontend">Frontend</option>
          <option value="fullstack">Full Stack</option>
        </select>
      </label>
    </aside>
  );
}
