import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom"
import postService from "../../../../service/PostService";
import type { PostDTO } from "../../../../dtos/models_dtos/PostDTO";
import { toast } from "react-toastify";
import { Navbar } from "../../../layout/navbar/Navbar";
import { PostPositionPageCard } from "./post_page_position_card";


export function PostPage() {

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "instant"})
    }, []);

    const params = useParams();
    const id = +params.id!;

    const [post, setPost] = useState<PostDTO>();

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

      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <div className="mb-4">
          <NavLink
            to="/"
            className="inline-flex items-center gap-2 text-teal-700 dark:text-teal-400 hover:underline"
          >
            ← Back to home
          </NavLink>
        </div>

        {/* Header + Summary */}
        <section className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            {post?.title ?? "Untitled post"}
          </h1>
          <p className="mt-2 text-slate-700 dark:text-slate-300">
            {post?.description ?? "No description provided."}
          </p>
        </section>

        {/* Content Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Overview card (keeps simple since we only have title/description) */}
          <article className="lg:col-span-2 rounded-xl border border-slate-200/70 dark:border-white/10 bg-white/80 dark:bg-slate-900/40 shadow-sm backdrop-blur p-5 sm:p-6">
            <h2 className="text-lg font-medium mb-2">Overview</h2>
            <p className="leading-7 text-slate-800 dark:text-slate-200">
              {post?.description ?? "No description yet."}
            </p>
          </article>

          {/* Right: Positions list */}
          <aside className="rounded-xl border border-slate-200/70 dark:border-white/10 bg-white/80 dark:bg-slate-900/40 shadow-sm backdrop-blur overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200/70 dark:border-white/10">
              <p className="text-sm uppercase tracking-wide text-slate-600 dark:text-slate-400">
                Get started
              </p>
            </div>

            <ul className="divide-y divide-slate-200/70 dark:divide-white/10">
              {post?.positions?.length ? (
                post.positions.map((p) => (
                  <li key={p.id}>
                    <PostPositionPageCard postId={id} postPosition={p as any} />
                  </li>
                ))
              ) : (
                <li className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
                  No open positions yet.
                </li>
              )}
            </ul>
          </aside>
        </section>
      </main>
    </div>
    )
}