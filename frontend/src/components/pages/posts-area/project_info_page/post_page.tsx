import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom"
import postService from "../../../../service/PostService";
import type { PostDTO } from "../../../../dtos/models_dtos/PostDTO";
import { toast } from "react-toastify";
import { Navbar } from "../../../layout/navbar/Navbar";
import { useScrollToTop } from "../../../../util/helper_hooks";
import { PostCardPositionCard } from "../post_card/post_card_position_card";
import { useUser } from "../../../../redux/hooks";
import { PostPositionPageCard } from "./post_page_position_card";
import { toNormal } from "../../../../util/util_functions";


export function PostPage() {

    useScrollToTop();

    const params = useParams();
    const id = +params.id!;

    const [post, setPost] = useState<PostDTO>();

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
        <div className="min-h-screen bg-gray-100 dark:bg-gradient-to-r dark:from-slate-900 dark:via-teal-950 dark:to-stone-900 text-slate-900 dark:text-white">
            <Navbar />

            <main className="w-full flex flex-col items-center mx-auto px-4 sm:px-6 lg:px-6 py-8">

                {/* Back to home*/}
                <div className="mb-4">
                    <NavLink
                        to="/"
                        className="inline-flex items-center gap-2 text-teal-700 dark:text-teal-400 hover:scale-110 duration-200"
                    >
                        Back to home
                    </NavLink>
                </div>


                <section className="bg-slate-900 shadow-xl shadow-slate-900 flex flex-col items-center w-4/5 p-5  min-h-screen">

                    <div className="w-9/10 sm:w-4/5 space-y-2 py-10">
                        <p className="text-lg sm:text-4xl font-semibold mb-8">{post && toNormal(post?.title)}</p>
                        <p className="text-gray-300">{post && toNormal(post?.description)}</p>
                    </div>


                    {/* Positions Card Container */}
                    <div className="w-full sm:w-4/5 rounded-xl border border-slate-200/70 dark:border-white/10 bg-white/80 dark:bg-slate-900/40 shadow-sm backdrop-blur overflow-hidden">

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