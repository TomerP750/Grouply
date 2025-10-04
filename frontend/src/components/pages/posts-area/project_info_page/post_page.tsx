import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import postService from "../../../../service/PostService";
import type { PostDTO } from "../../../../dtos/models_dtos/PostDTO";
import { toast } from "react-toastify";
import { Navbar } from "../../../layout/navbar/Navbar";
import { PostPositionPageCard } from "./post_page_position_card";


export function PostPage() {

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
        <div className="min-h-screen dark:bg-slate-900 text-white">
            <Navbar />
            <main className="w-full px-15 flex flex-col items-center">

                <section className="flex flex-col items-center justify-center">
                    <button className="bg-teal-700 hover:bg-teal-500 px-2 py-1 rounded-lg cursor-pointer">Back to home</button>
                    <h1>{post?.title}</h1>
                    <p>{post?.description}</p>
                </section>

                <section className="bg-slate-800 py-5 space-y-5 w-2/3 ring ring-gray-100/20 rounded-lg">
                    
                    <ul className="flex flex-col">
                        <p className="px-3">Get started</p>
                        {post?.positions.map(p => {
                            return <PostPositionPageCard key={p.id} postId={id} postPosition={p}/>
                        })}
                    </ul>

                </section>
            </main>
        </div>
    )
}