import { useEffect, useState } from "react"
import { Navbar } from "../../layout/navbar/Navbar";
import { PostDTO } from "../../../dtos/models_dtos/post_dto";
import archivedPostService from "../../../service/archived_project_service";
import { toast } from "react-toastify";
import { PostCard } from "../posts-area/post_card/post_card";
import { BiQuestionMark } from "react-icons/bi";
import { Filters } from "../posts-area/filters_area/filters";
import { usePagination } from "../../../util/helper_hooks";
import { FilterProvider, useFilters } from "../../../context/filter_context";



export function ArchivedPostsFeed() {

    const [archivedPosts, setArchivedPosts] = useState<PostDTO[]>([]);
    const { pagination } = usePagination(5);
 
    useEffect(() => {
       
        archivedPostService.allArchived(pagination.pageIndex, pagination.pageSize)
            .then(res => {
                setArchivedPosts(res.content)
            })
            .catch(err => {
                toast.error(err.response.data ?? "Something wrong");
            })
    }, []);

    const handleRemoveFromArchive = (id: number) => {
        setArchivedPosts(prev => prev.filter(p => p.id !== id));
    }

    return (
        <FilterProvider>
        <div className="flex flex-col  min-h-screen">
            <Navbar />
            <div className="flex-col lg:flex-row flex w-full items-center gap-5 lg:gap-0 lg:items-start lg:py-10 min-h-screen">
                {/* Filters */}
                <Filters onFilterChange={() => {}} posts={archivedPosts}/>

                {/* Archived Grid */}
                {
                    archivedPosts.length > 0 ?
                <div className="grid grid-cols-1 flex-1 justify-items-start gap-5 px-10">
                    {archivedPosts.map(ap => {
                        return <PostCard key={ap.id}
                            projectPost={ap}
                        // onRemoveFromArchive={() => handleRemoveFromArchive(ap.id)} 
                        />
                    })}
                </div>
                : 
                <div className="flex justify-center flex-1 dark:text-white">
                
                    <p>You have not archived posts yet</p>
                </div>
                }


            </div>
        </div>
        </FilterProvider>
    )
}