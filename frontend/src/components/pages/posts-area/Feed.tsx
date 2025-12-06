import { useCallback, useEffect, useRef, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { useInView } from "react-intersection-observer";
import { toast } from "react-toastify";
import { useFilters } from "../../../context/filter_context";
import type { PostDTO } from "../../../dtos/models_dtos/post_dto";
import { useSyncFiltersWithUrl } from "../../../hooks/useFiltersWithUrls";
import { default as postService } from "../../../service/post_service";
import { usePagination } from "../../../util/helper_hooks";
import { Navbar } from "../../layout/navbar/Navbar";
import { FeedHeader } from "./feed_header";
import { Filters } from "./filters_area/filters";
import { PostCard } from "./post_card/post_card";



export function Feed() {

    const [posts, setPosts] = useState<PostDTO[]>([]);
    const { sortDirection, selectedRoles, selectedTechnologies } = useFilters();
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const { pagination, setPagination } = usePagination(3);

    const { ref, inView } = useInView({
        threshold: 0.3,
        triggerOnce: false
    });

    useEffect(() => {

        setLoading(true);
        postService
            .searchPosts(pagination.pageIndex, pagination.pageSize, selectedRoles, selectedTechnologies, sortDirection)
            .then((res) => {
                
                setHasMore(!res.last);

                if (pagination.pageIndex === 0) {
                    setPosts(res.content);
                } else {
                    setPosts(prev => [...prev, ...res.content]);
                }

                console.log("fetching");
                
            })
            .catch((err) => {
                toast.error(err.response?.data || "Something went wrong");
            })
            .finally(() => {
                setLoading(false);
            });

    }, [selectedRoles, selectedTechnologies, sortDirection ,pagination.pageIndex, pagination.pageSize]);



    const handleAdd = (newPost: PostDTO) => {
        setPosts(prev => [...prev, newPost]);
    };


    const handleRemove = (deletePostId: number) => {
        setPosts(prev => prev.filter(p => p.id !== deletePostId))
    }

    const loadMore = useCallback(() => {

        if (loading || !hasMore) return;

        setPagination(prev => ({
            ...prev,
            pageIndex: prev.pageIndex + 1,
        }));

    }, [loading, hasMore, setPagination])



    useEffect(() => {
        if (!inView) return;
        if (loading || !hasMore) return;

        loadMore();
    }, [inView, hasMore]);


    useEffect(() => {
        setPagination(prev => ({
            ...prev,
            pageIndex: 0
        }));
    }, [selectedRoles, selectedTechnologies, sortDirection]);


    // Im using this to show the filters in the url
    useSyncFiltersWithUrl(selectedRoles, selectedTechnologies, sortDirection);

    return (
        <main className="min-h-screen pb-10">

            <Navbar />

            {/* POSTS AND FILTERS */}
            <div className="flex flex-col pt-10 md:pt-0 md:mt-5 px-5 md:px-0 lg:flex-row w-full items-center lg:items-start gap-6">
                <Filters />

                {/* <MobileFilters /> */}
                {/* Main area */}
                <section className="w-full flex justify-center px-0 sm:px-5 pt-6">

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


            {/* Pagination */}
            {hasMore && <div className="mt-10 flex justify-center gap-1 text-white">
                <button
                    ref={ref}
                    onClick={loadMore}
                    disabled={loading}
                    className={`inline-flex justify-center cursor-pointer bg-blue-600 
                hover:bg-blue-800 px-3 py-2 rounded-xl min-w-30 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    {loading ? <BiLoaderAlt size={20} className="animate-spin" /> : "Load More"}
                </button>
            </div>}

        </main>

    )
}