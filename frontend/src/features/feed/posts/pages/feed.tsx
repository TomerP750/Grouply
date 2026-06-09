import { useState } from "react";
import { FeedHeader } from "../../components/FeedHeader";
import { PostCard } from "../../components/post_card/PostCard";
import { Filters } from "../../filters/components/Filters";
import type { PostDTO } from "../../shared/models/PostDto";
import postService from "../api/postService";
import { useQuery } from "@tanstack/react-query"
import { BiLoaderCircle } from "react-icons/bi";


export function Feed() {

    const [page, setPage] = useState<number>(0);
    const size = 10;

    // const { data, isLoading } = useQuery({
    //     queryKey: ["posts", page],
    //     queryFn: () => postService.allPosts(page, size),
    //     staleTime: 60 * 1000 * 5
    // })

    // const posts: PostDTO[] = data?.content ?? [];
    const posts: PostDTO[] = [];
    

    // if (isLoading) {
    //     return (
    //         <main className="min-h-screen pb-10 flex items-center justify-center">
    //             <BiLoaderCircle size={30} className="animate-spin"/>
    //         </main>
    //     )
    // }

    return (
        <main className="min-h-screen pb-10">

            {/* POSTS AND FILTERS */}
            <div className="bg-neutral-200 dark:bg-stone-950 flex flex-col lg:pt-25 md:mt-5 px-5 md:px-0 lg:flex-row w-full items-center lg:items-start gap-6">
                <Filters />

                {/* Main area */}
                <section className="w-full flex justify-center px-0 sm:px-5 ">

                    {/* Width cap + centered */}
                    <div className="w-full grid grid-cols-1 justify-items-center lg:justify-items-start gap-y-10">

                        <FeedHeader />

                        {posts.map(p => (
                            <PostCard
                                key={p.id}
                                projectPost={p}
                            />
                        ))}
                    </div>

                </section>
            </div>

        </main>

    )
}