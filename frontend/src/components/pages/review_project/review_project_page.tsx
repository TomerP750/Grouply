import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { ProjectDTO } from "../../../dtos/models_dtos/ProjectDTO";
import projectService from "../../../service/ProjectService";
import { Navbar } from "../../layout/navbar/Navbar";
import { BiLoaderAlt } from "react-icons/bi";
import { useBodyScrollLock } from "../../../util/helper_hooks";


const btn = "cursor-pointer transition-colors duration-200 rounded-full px-3 py-2 w-25"

export function ReviewProjectPage() {

    const [url, setUrl] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const [projects, setProjects] = useState<ProjectDTO[]>([]);

    useEffect(() => {
        projectService.getAllUserOwnedProjects()
            .then(res => {
                setProjects(res);
            })
            .catch(err => {
                toast.error(err.response.data);
            })
    }, []);

    
    useBodyScrollLock(loading);
    

    const hasUrl = url.trim().toLowerCase().length > 0;

    const handleReview = () => {
        setLoading(true);
        toast.success(url);
    }

    return (
  <div className="min-h-screen dark:bg-gradient-to-br dark:from-slate-900 dark:via-teal-950 dark:to-stone-900">
    <Navbar />

    <section className="mx-auto max-w-3xl px-4 py-10 mt-20 flex flex-col items-center justify-center gap-8 dark:text-white">
      <h1 className="text-center text-3xl font-semibold tracking-wide">
        {loading ? "Reviewing Project" : "Review Your Projects"}
      </h1>

      <div className="w-full">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          inputMode="url"
          pattern="https?://.+"
          className="w-full rounded-full bg-slate-700/60 px-4 py-2 shadow-md shadow-black/40 outline-none transition
                    focus:ring-2 focus:ring-teal-500 "
        />
        
      </div>

      <div className="flex items-center gap-4">
        <button
          disabled={!hasUrl || loading}
          onClick={handleReview}
          className={`${btn} inline-flex items-center justify-center rounded-full bg-teal-500 px-5 py-2 font-medium text-white transition
                      hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400
                      disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-teal-500`}
        >
          {loading ? "Reviewing" : "Review"}
        </button>

        <button
          onClick={() => setUrl("")}
          disabled={!hasUrl || loading}
          type="button"
          className={`rounded-full bg-gray-500 px-5 py-2 font-medium text-white transition hover:bg-gray-600
                      focus:outline-none focus:ring-2 focus:ring-slate-400 ${btn}
                      disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-500`}
        >
          Reset
        </button>
      </div>
    </section>

    <section className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-4 pb-16 dark:text-white">
      <select
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-60 appearance-none rounded-lg border border-slate-300 px-3 py-2 text-center shadow-sm
                   outline-none transition
                   focus:ring-2 focus:ring-teal-500
                   dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      >
        <option value="">Select A Project</option>
        {projects.length > 0 ? (
          projects.map((p) => (
            <option key={p.id} value={p.name}>
              {p.name}
            </option>
          ))
        ) : (
          <option disabled>You have no projects</option>
        )}
      </select>

      {loading && (
        <div className="fixed inset-0 z-50 flex min-h-screen w-full items-center justify-center bg-black/60 backdrop-blur-sm">
          <BiLoaderAlt size={60} className="animate-spin text-white/90" />
        </div>
      )}
    </section>
  </div>
);

}