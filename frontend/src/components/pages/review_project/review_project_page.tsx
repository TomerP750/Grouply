import { useEffect, useRef, useState } from "react";
import { BiCheckCircle, BiChevronLeft, BiErrorCircle, BiLoaderAlt } from "react-icons/bi";
import { toast } from "react-toastify";
import type { ProjectDTO } from "../../../dtos/models_dtos/ProjectDTO";
import projectService from "../../../service/ProjectService";
import { useBodyScrollLock } from "../../../util/helper_hooks";
import { Navbar } from "../../layout/navbar/Navbar";
import { getGradeColor } from "../../../util/ui_helper";
import { averageGrades, toTitleCase } from "../../../util/util_functions";
import { MetricsTable } from "./metrics_table";
import { NavLink, type Link } from "react-router-dom";

export const resultDummy = {
    repositoryName: "grouply",
    grade: 90,
    feedback: {
        overall:
            "Excellent structure and maintainability. The project demonstrates solid understanding of Spring Boot and layered architecture.",
        positives: [
            "Clean and modular service design with minimal coupling.",
            "Consistent DTO and mapper usage across the codebase.",
            "Effective error handling and clear exception structure.",
            "Code is easy to read and logically organized.",
        ],
        improvements: [
            "Add more unit tests for controller endpoints.",
            "Consider extracting repeated logic in some services into utility methods.",
            "Include inline documentation for complex query methods.",
        ],
    },
    metrics: {
        architecture: 95,
        codeQuality: 92,
        maintainability: 88,
        performance: 90,
        testing: 78,
        documentation: 82,
    },
    analyzedAt: "2025-11-05T10:45:00Z",
};



const btn = "cursor-pointer transition-colors duration-200 rounded-full px-3 py-2 w-25"

export function ReviewProjectPage() {

    const [url, setUrl] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<boolean>(false);

    const grade = averageGrades(resultDummy.metrics);

    const [projects, setProjects] = useState<ProjectDTO[]>([]);

    useEffect(() => {
        projectService.allUserOwnedFinishedProjects()
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

        const timeout = setTimeout(() => {
            setLoading(false);
            toast.success(url);
            setResult(true);
            setUrl('');
        }, 3000);

        return () => clearTimeout(timeout);

    }

    if (result) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:via-teal-950 dark:to-stone-900">
                <Navbar />

                <main className="w-full ">
                    {/* Top actions */}
                    <div className=" max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-6">
                        <button
                            onClick={() => setResult(false)}
                            className="cursor-pointer inline-flex items-center gap-1 px-4 py-2 rounded-lg  bg-white text-slate-700 hover:bg-slate-50 transition  dark:bg-teal-600/50 dark:text-slate-100 dark:hover:bg-teal-500/50"
                        >
                            <BiChevronLeft size={22} />
                            <span>Back</span>
                        </button>
                    </div>

                    {/* Page content */}
                    <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
                        {/* Header */}
                        <header className="flex flex-col items-center text-center gap-3 mb-8">
                            <span
                                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold shadow-sm ${getGradeColor(
                                    resultDummy.grade
                                )}`}
                            >
                                Grade: {grade}/100
                            </span>

                            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
                                {toTitleCase(resultDummy.repositoryName)}’s Review
                            </h1>




                        </header>

                        {/* Grid content */}
                        <div className="grid grid-cols-1 gap-6">

                            {/* Feedback columns */}
                            <div className="lg:col-span-2 space-y-6">

                                {/* Summery */}
                                <div className="flex flex-col items-start gap-3 bg-slate-900/20 p-5">
                                    <h2 className="text-slate-300 text-lg font-semibold">Summery:</h2>
                                    <p className="text-slate-600 dark:text-slate-300">
                                        {resultDummy.feedback.overall}
                                    </p>
                                </div>

                                {/* Positives */}
                                <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50/60 shadow-sm p-5 dark:border-emerald-900/40 dark:bg-emerald-900/10">
                                    <h2 className="text-lg font-semibold text-emerald-800 mb-3 dark:text-emerald-300">
                                        Positives
                                    </h2>
                                    <ul className="space-y-2">
                                        {resultDummy.feedback.positives.map((p) => (
                                            <li
                                                key={p}
                                                className="flex items-start gap-3 text-emerald-900 dark:text-emerald-200"
                                            >
                                                <BiCheckCircle className="mt-0.5" size={20} />
                                                <span>{p}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Improvements */}
                                <div className="rounded-2xl border border-amber-200/60 bg-amber-50/60 shadow-sm p-5 dark:border-amber-900/40 dark:bg-amber-900/10">
                                    <h2 className="text-lg font-semibold text-amber-800 mb-3 dark:text-amber-300">
                                        Improvements
                                    </h2>
                                    <ul className="space-y-2">
                                        {resultDummy.feedback.improvements.map((p) => (
                                            <li
                                                key={p}
                                                className="flex items-start gap-3 text-amber-900 dark:text-amber-200"
                                            >
                                                <BiErrorCircle className="mt-0.5" size={20} />
                                                <span>{p}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Metrics card */}
                            <aside className="lg:col-span-2">

                                <MetricsTable metrics={resultDummy.metrics} />

                            </aside>
                        </div>
                    </section>

                </main>
            </div>
        );
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
                    disabled={url.length > 0}
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-60 appearance-none rounded-lg border border-slate-300 px-3 py-2 text-center shadow-sm
                   disabled:opacity-50 disabled:cursor-not-allowed
                    outline-none transition cursor-pointer
                   focus:ring-2 focus:ring-teal-500
                   dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                    <option value="">Select A Project</option>
                    {projects.length > 0 ? (
                        projects.map((p) => (
                            <option key={p.id} value={p.githubRepositoryUrl}>
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