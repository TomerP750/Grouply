import { useEffect, useState } from "react";
import { useUser } from "../../../redux/hooks";
import type { StatisticsDTO } from "../../../dtos/models_dtos/statistics_dto";
import statisticsService from "../../../service/statistics_service";
import { toast } from "react-toastify";
import { HiHandRaised } from "react-icons/hi2";
import { DashboardStatCard } from "./tables/dashborard_stat_card";
import { FiFolder, FiCheckCircle, FiLink, FiUsers } from "react-icons/fi";
import { ActiveProjectsChart } from "./tables/charts/active_projects_chart";
import { ConnectionsChart } from "./tables/charts/connections_chart";
import type { ActivityDTO } from "../../../dtos/models_dtos/activity_dto";
import activityService from "../../../service/activity_service";
import { timeAgo } from "../../../util/util_functions";



export function Overview() {

  const user = useUser();
  const [stats, setStats] = useState<StatisticsDTO>();

  const [activites, setActivities] = useState<ActivityDTO[]>([]);

  useEffect(() => {
    statisticsService.getStats()
      .then(res => {
        setStats(res);
      })
      .catch(err => {
        toast.error(err.response.data);
      })
    activityService.allActivities()
      .then(res => {
        setActivities(res)
      })
      .catch(err => {
        toast.error(err.response.data);
      })
  }, []);

  return (
    <main className="p-8">
      {/* Header */}
      <div className="space-y-2 mb-10 py-3">
        <h1 className="text-4xl font-semibold text-white">
          Welcome back, <span className="text-teal-400">{user.username}</span>
        </h1>
        <p className="text-slate-400">Here’s an overview of your workspace today.</p>
      </div>

      {/* Stats Row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-5">
        <DashboardStatCard
          Icon={FiFolder}
          label="Active Projects"
          value={stats?.activeProjects!}
          color="text-teal-400"
        />

        <DashboardStatCard
          Icon={FiCheckCircle}
          label="Completed Projects"
          value={stats?.completedProjects!}
          color="text-indigo-400"
        />

        <DashboardStatCard
          Icon={FiLink}
          label="Connections"
          value={stats?.connections!}
          color="text-pink-400"
        />

        {/* <DashboardStatCard
          Icon={<FiUsers size={24} className="text-amber-400" />}
          label="Team Members"
          value={stats?.teamMembers!}
          color="text-amber-400"
        /> */}
      </section>

      {/* Charts Row */}
      {stats && <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full  mb-8 text-white">
        {/* Active projects and connections */}
        <div className="bg-slate-900/80 rounded-xl p-6 border border-slate-800 shadow-md">
          <p className="text-2xl">Active Projects</p>
          <ActiveProjectsChart activeProjectsCount={stats?.activeProjects} />
        </div>

        <div className="bg-slate-900/80 rounded-xl p-6 border border-slate-800 shadow-md">
          <p className="text-2xl">Connections</p>
          <ConnectionsChart total={stats?.connections} />
        </div>

      </section>}


      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full  text-white">

        <div className="bg-slate-900/80 rounded-xl h-60 p-6 border border-slate-800 shadow-md">
          
          <h1 className="text-2xl font-medium mb-3">Recent Activity</h1>
          <div className="space-y-3 text-gray-300">
            {activites?.map(a => (
              <div key={a.id} className="flex items-center gap-1 ">
                <div className="w-3 h-3 rounded-full bg-teal-500 border-2 border-white dark:border-slate-900" />
                <p className="inline-flex items-center gap-1 text-sm text-slate-800 dark:text-slate-100">
                  {a.message} <span className="text-slate-500 text-xs">● {timeAgo(a.createdAt)}</span>
                </p>
              </div>
            ))}

          </div>
        </div>

        <div className="bg-slate-900/80 rounded-xl p-6 border border-slate-800 shadow-md">

        </div>

      </section>

    </main>
  );

}
