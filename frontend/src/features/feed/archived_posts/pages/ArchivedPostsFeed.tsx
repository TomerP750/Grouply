import { useState } from "react";
import type { PostDTO } from "../../shared/models/PostDto";
import { useQuery } from "@tanstack/react-query";
import archivedPostService from "../api/archivedPostService";
import type { Pagination } from "../../../../shared/models/Pagination";



export function ArchivedPostsFeed() {

    const [archivedPosts, setArchivedPosts] = useState<PostDTO[]>([]);

    const [pagination, setPagination] = useState<Pagination>({
        pageIndex: 0,
        pageSize: 10
    });
    
    // const {data, isLoading, error} = useQuery({
    //     queryKey: ["archived"],
    //     queryFn: () => archivedPostService.allArchived(0, 10),
    // });

    const handleRemoveFromArchive = (id: number) => {
        setArchivedPosts(prev => prev.filter(p => p.id !== id));
    }

    return (
       
        <div className="min-h-screen ">
            
            <div className="flex-col lg:flex-row flex w-full items-center gap-5 
            lg:pt-35 dark:bg-stone-950
            lg:gap-0 lg:items-start lg:py-10 min-h-screen">
                {/* Filters */}
                {/* <Filters /> */}

                {/* Archived Grid */}
                {/* {
                    archivedPosts.length > 0 ?
                <div className="grid grid-cols-1 flex-1 justify-items-start gap-5 px-10">
                    {archivedPosts.map(ap => {
                        return <PostCard key={ap.id}
                            projectPost={ap}
                        />
                    })}
                </div>
                : 
                <div className="flex justify-center flex-1 dark:text-white">
                
                    <p>You have not archived posts yet</p>
                </div>
                }
 */}

            </div>
        </div>
      
    )
}