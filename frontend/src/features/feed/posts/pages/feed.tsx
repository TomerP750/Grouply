import { useState } from "react";
import { FeedHeader } from "../../components/FeedHeader";
import { PostCard } from "../../components/post_card/PostCard";
import { Filters } from "../../filters/components/Filters";
import type { PostDTO } from "../../models/PostDto";




export function Feed() {

    const [posts, setPosts] = useState<PostDTO[]>([]);

    const [loading, setLoading] = useState<boolean>(false);


    const handleAdd = (newPost: PostDTO) => {
        setPosts(prev => [...prev, newPost]);
    };


    const handleRemove = (deletePostId: number) => {
        setPosts(prev => prev.filter(p => p.id !== deletePostId))
    }

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

                        {posts?.map(p => (
                            <PostCard
                                key={p.id}
                                projectPost={p}
                                onRemove={() => handleRemove(p.id)}
                            />
                        ))}
                    </div>

                </section>
            </div>

        </main>

    )
}