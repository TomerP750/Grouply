import { useEffect, useState } from "react"
import { Navbar } from "../../layout/navbar/Navbar";
import { PostDTO } from "../../../dtos/models_dtos/PostDTO";
import archivedPostService from "../../../service/ArchivedProjectService";
import { toast } from "react-toastify";
import { PostCard } from "../posts-area/post_card/post_card";
import { BiQuestionMark } from "react-icons/bi";



export function ArchivedPostsFeed() {

    const [archivedPosts, setArchivedPosts] = useState<PostDTO[]>([]);
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(10);

    useEffect(() => {
        archivedPostService.allArchived(page, size)
            .then(res => {
                setArchivedPosts(res.content)
                console.log(res.content);

            })
            .catch(err => {
                toast.error(err.response.data ?? "Something wrong");
            })
    }, []);

    const handleRemoveFromArchive = (id: number) => {
        setArchivedPosts(prev => prev.filter(p => p.id !== id));
    }

    return (
        <div className="flex flex-col bg-slate-900 min-h-screen">
            <Navbar />
            <div className="flex-col lg:flex-row flex w-full items-center gap-5 lg:gap-0 lg:items-start lg:py-10 min-h-screen">
                {/* Filters */}
                <div className="w-70 h-80 lg:sticky lg:top-10 bg-slate-700">

                </div>

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
                <div className="flex justify-center flex-1 text-white">
                
                    <p>You have not archived posts yet</p>
                </div>
                }


            </div>
        </div>
    )
}