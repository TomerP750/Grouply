import { useEffect, useState } from "react";
import { useUser } from "../../../redux/hooks";
import type { StatisticsDTO } from "../../../dtos/models_dtos/statistics_dto";
import statisticsService from "../../../service/statistics_service";
import { toast } from "react-toastify";
import { HiHandRaised } from "react-icons/hi2";

export function Overview() {
  
    const user = useUser();
    const [stats, setStats] = useState<StatisticsDTO>();

    useEffect(() => {
        statisticsService.getStats()
        .then(res => {
            setStats(res);
        })
        .catch(err => {
            toast.error(err.response.data);
        })
    }, []);
  
    return (
    <div className="p-6 lg:p-8 dark:text-white">
      {/* Greeting */}
      <h1 className="text-4xl font-bold mb-8 flex items-center gap-2">
        Hello, <span className="text-teal-500">{user.username}</span> 
        <span><HiHandRaised/></span>
      </h1>

      {/* Stats grid */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <li className="text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
          <p className="text-5xl font-bold text-teal-500">{stats?.activeProjects}</p>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Active Projects
          </p>
        </li>

        <li className="text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
          <p className="text-5xl font-bold text-indigo-500">{stats?.completedProjects}</p>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Projects Completed
          </p>
        </li>

        <li className="text-center col-span-2 py-30 rounded-full border-5 max-w-1/2 border-slate-200 dark:border-teal-500 p-6 shadow-sm">
          <p className="text-5xl font-bold text-rose-500">{stats?.connections}</p>
          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Connections
          </p>
        </li>

        
      </ul>

      {/* Lower panels */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
          {/* <p className="text-slate-500 dark:text-slate-400">
            You joined <span className="font-semibold text-teal-500">2</span>{" "}
            new projects this week and gained{" "}
            <span className="font-semibold text-indigo-500">3</span> new
            connections.
          </p> */}
        </div>

        <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Highlights</h2>
          {/* <p className="text-slate-500 dark:text-slate-400">
            Your top project is <span className="font-semibold">Grouply</span>{" "}
            with <span className="font-semibold text-amber-500">92%</span>{" "}
            activity this month.
          </p> */}
        </div>
      </div>
    </div>
  );
}
