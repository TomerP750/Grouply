import { useState } from "react";
import { FeedHeader } from "../components/FeedHeader";

import type { PostDTO } from "../../shared/models/PostDto";
import postService from "../api/postService";
import { useQuery } from "@tanstack/react-query"
import { BiLoaderCircle } from "react-icons/bi";
import { PostCard } from "../components/post_card/PostCard";


export function Feed() {

    const [pageIndex, setPageIndex] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(10);

    // const { data, isLoading } = useQuery<PostDTO>({
    //     queryKey: ["posts", pageIndex, pageSize],
    //     queryFn: () => postService.allPosts(pageIndex, pageSize),
    //     staleTime: 1000 * 60 * 5,
    // });

    const posts: PostDTO[] = [];


    // if (isLoading) {
    //     return (
    //         <main className="min-h-screen pb-10 flex items-center justify-center">
    //             <BiLoaderCircle size={30} className="animate-spin"/>
    //         </main>
    //     )
    // }

    return (
        <main className="min-h-screen">

            {/* POSTS AND FILTERS */}
            <div className="py-10 bg-neutral-200 dark:bg-stone-950 flex flex-col px-5 md:px-0 lg:flex-row w-full items-center lg:items-start gap-6">

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