import { useEffect, useState } from "react";
import { MdHistory } from "react-icons/md";
import { toast } from "react-toastify";
import { useUser } from "../../../shared/store/hooks";
import { Hr } from "../../../shared/ui/Hr";
import activityService from "./activity/api/activityService";
import { ActivityRow } from "./activity/components/ActivityRow";
import type { ActivityDTO } from "./activity/models/ActivityDto";


export function Overview() {

  const user = useUser();

  const [activites, setActivities] = useState<ActivityDTO[]>([]);

  useEffect(() => {
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

      {/* Recent activity */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">

        <div className="bg-gradient-to-br from-white to-slate-100 dark:from-stone-800 dark:to-stone-900 rounded-xl min-h-60 p-6 border border-slate-800 shadow-md">
          
          <h1 className="inline-flex items-center gap-1 text-black dark:text-white font-medium ">
            <MdHistory size={30}/>
            <span className="text-2xl">Recent Activity</span>
            </h1>
          <Hr />
          <ul className="space-y-1 dark:text-gray-300">
            {activites.length > 0 ? activites?.map(a => {
              return <li key={a.id} className="odd:bg-slate-300 dark:odd:bg-stone-900 dark:even:bg-stone-800 px-2 py-1"><ActivityRow key={a.id} activity={a}/></li>
            }) : <span>No Recent Activities</span>}

          </ul>

        </div>
        
      </section>

    </main>
  );

}
