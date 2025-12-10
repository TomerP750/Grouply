import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom"
import postService from "../../../../service/post_service";
import type { PostDTO } from "../../../../dtos/models_dtos/post_dto";
import { toast } from "react-toastify";
import { Navbar } from "../../../layout/navbar/Navbar";
import { useScrollToTop } from "../../../../util/helper_hooks";
import { PostCardPositionCard } from "../post_card/post_card_position_card";
import { useUser } from "../../../../redux/hooks";
import { PostPositionPageCard } from "./post_page_position_card";
import { toNormal } from "../../../../util/util_functions";
import { technologyIconMap } from "../../../../util/technology_icon_mapper";


export function PostPage() {

    useScrollToTop();

    const params = useParams();
    const id = +params.id!;

    const [post, setPost] = useState<PostDTO>();
    const techs = post?.projectDTO.technologies;

    const user = useUser();

    useEffect(() => {
        postService.onePost(id)
            .then(res => {
                setPost(res);
            })
            .catch(err => {
                toast.error(err.respone.data);
            })
    }, []);




    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 dark:via-teal-950 dark:to-stone-900 text-slate-900 dark:text-white">
            <Navbar />

            <main className="w-full flex flex-col items-center mx-auto pb-8">


                {/* Card */}
                <section className="bg-gradient-to-br from-indigo-100 to-slate-200 dark:from-slate-800 dark:to-sky-950 shadow-xl shadow-gray-500 dark:shadow-slate-900 flex flex-col items-center w-full p-5  min-h-screen">

                    <div className="w-9/10 sm:w-4/5 space-y-2 py-10">

                        {/* Back to home*/}
                        <div className="mb-8 w-full flex justify-center">
                            <NavLink
                                to="/"
                                className="inline-flex rounded-full items-center gap-2 dark:text-sky-400 hover:scale-110 duration-200"
                            >
                                Back to home
                            </NavLink>
                        </div>

                        <p className="text-lg sm:text-4xl font-semibold mb-8">{post && toNormal(post?.title)}</p>
                        <p className="dark:text-gray-300 max-w-9/10 break-words">{post && toNormal(post?.description)}</p>
                        <p className="mb-5">Project's Technologies:</p>
                        <ul className="flex flex-wrap items-center gap-3">
                            {techs?.map((t) => {
                                const Icon = technologyIconMap[t.slug] ?? null;

                                return (
                                    <li
                                        key={t.id}
                                        className="flex items-center gap-2 bg-indigo-200 font-medium dark:border dark:border-sky-400/30 dark:bg-slate-700/30 text-black dark:text-slate-300 px-3 py-1 rounded-full text-sm"
                                    >
                                        {Icon && <Icon color={t.color ?? "#38bdf8"} size={18} />}
                                        <span>{t.name}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>


                    {/* Positions Card Container */}
                    <div className="w-full sm:w-4/5 rounded-xl border border-slate-200/70 dark:border-white/10 dark:bg-slate-700/20 bg-slate-200/30 shadow-sm backdrop-blur overflow-hidden">

                        {/* Header */}
                        <div className="px-4 py-3 border-b border-slate-200/70 dark:border-white/10">
                            <p className="text-sm uppercase tracking-wide text-slate-600 dark:text-slate-400">
                                Open positions
                            </p>
                        </div>

                        {/* Open positions */}
                        <ul className="overflow-y-auto divide-y divide-slate-200/70 dark:divide-white/10">
                            {post?.positions?.length ? (
                                post.positions.map((p) => (
                                    <li key={p.id} className="p-2 hover:bg-slate-950/5 dark:hover:bg-white/5 transition-colors">
                                        <PostPositionPageCard postPosition={p} post={post} />
                                    </li>
                                ))
                            ) : (
                                <li className="px-4 py-6 text-sm text-slate-500 dark:text-slate-400">
                                    No open positions yet.
                                </li>
                            )}
                        </ul>


                    </div>
                </section>

            </main>
        </div>
    )
}