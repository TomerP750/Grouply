export function Filters() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 w-full text-slate-900 dark:text-slate-100">
      
      {/* Project name */}
      <label className="flex flex-col gap-2 text-sm">
        <span className="font-medium">Search by Project Name</span>
        <input
          type="search"
          placeholder="Enter project name..."
          className="rounded-md border border-slate-300 dark:border-slate-600 
                     bg-gray-100 dark:bg-slate-800 
                     px-3 py-2 text-sm 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
        />
      </label>

      {/* Start date */}
      <label className="flex flex-col gap-2 text-sm">
        <span className="font-medium">Search by Start Date</span>
        <input
          type="date"
          className="rounded-md border border-slate-300 dark:border-slate-600 
                     bg-gray-100 dark:bg-slate-800 
                     px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
        />
      </label>

      {/* Role demand */}
      <label className="flex flex-col gap-2 text-sm">
        <span className="font-medium">Role Demand</span>
        <select
          className="rounded-md border border-slate-300 dark:border-slate-600 
                     bg-gray-100 dark:bg-slate-800 
                     px-3 py-2 text-sm 
                     text-slate-700 dark:text-slate-200
                     focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
        >
          <option value="">Any Role</option>
          <option value="backend">Backend</option>
          <option value="frontend">Frontend</option>
          <option value="fullstack">Full Stack</option>
        </select>
      </label>
    </div>
  );
}
