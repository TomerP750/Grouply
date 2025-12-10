import { useEffect, useState } from "react";
import { FiCheckCircle, FiFolder, FiLink } from "react-icons/fi";
import { toast } from "react-toastify";
import type { ActivityDTO } from "../../../../dtos/models_dtos/activity_dto";
import type { StatisticsDTO } from "../../../../dtos/models_dtos/statistics_dto";
import { useUser } from "../../../../redux/hooks";
import activityService from "../../../../service/activity_service";
import statisticsService from "../../../../service/statistics_service";
import { Hr } from "../../../elements/Hr";
import { ActiveProjectsChart } from "../charts/active_projects_chart";
import { ConnectionsChart } from "../charts/connections_chart";
import { ActivityRow } from "./activity_row";
import { DashboardStatCard } from "./dashborard_stat_card";
import { FaClock, FaHistory } from "react-icons/fa";
import { LuActivity } from "react-icons/lu";
import { MdHistory } from "react-icons/md";




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
        <h1 className="text-4xl font-semibold dark:text-white">
          Welcome back, <span className="dark:text-sky-400">{user.username}</span>
        </h1>
        <p className="text-slate-700 dark:text-slate-400">Here’s an overview of your workspace today.</p>
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
      {/* Projects chart */}
      {stats && <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full  mb-8 dark:text-white">
        {/* Active projects and connections */}
        <div className="bg-gradient-to-br from-white to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 border border-slate-800 shadow-md">
          <h1 className="inline-flex items-center gap-1 text-black dark:text-white font-medium ">
            <MdHistory size={30}/>
            <span className="text-2xl">Projects</span>
            </h1>
          <Hr />
          <ActiveProjectsChart activeProjectsCount={stats?.activeProjects} />
        </div>

        {/* Connections chart */}
        <div className="bg-gradient-to-br from-white to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 border border-slate-800 shadow-md space-y-5">
          <h1 className="inline-flex items-center gap-1 text-black dark:text-white font-medium ">
            <MdHistory size={30}/>
            <span className="text-2xl">Connections</span>
            </h1>
          <Hr />
          <ConnectionsChart total={stats?.connections} />
        </div>

      </section>}

        {/* Recent activity */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">

        <div className="bg-gradient-to-br from-white to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl min-h-60 p-6 border border-slate-800 shadow-md">
          
          <h1 className="inline-flex items-center gap-1 text-black dark:text-white font-medium ">
            <MdHistory size={30}/>
            <span className="text-2xl">Recent Activity</span>
            </h1>
          <Hr />
          <ul className="space-y-1 dark:text-gray-300">
            {activites.length > 0 ? activites?.map(a => {
              return <li key={a.id} className="odd:bg-slate-300 dark:odd:bg-slate-900  dark:even:bg-slate-800 px-2 py-1"><ActivityRow key={a.id} activity={a}/></li>
            }) : <span>No Recent Activities</span>}

          </ul>

        </div>

        <div className="bg-gradient-to-br from-white to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl p-6 border border-slate-800 shadow-md">

        </div>

      </section>

    </main>
  );

}
