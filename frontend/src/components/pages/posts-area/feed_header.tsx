import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { CreatePostForm } from "./create_post_form";
import type { PostDTO } from "../../../dtos/models_dtos/PostDTO";

interface FeedHeaderProps {
    onAdd: (newPost: PostDTO) => void

}

export function FeedHeader({ onAdd }: FeedHeaderProps) {

    const [hover, setHover] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    return (
        <div onClick={() => setModalOpen(true)} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)} className="bg-gradient-to-r from-slate-800/40 to-slate-700/40 border border-slate-600/60 rounded-2xl p-8 hover:border-teal-500/60 transition-all duration-300">
            <button className="cursor-pointer inline-flex items-center gap-3">
                <BiPlus size={50} className={`text-teal-400 text-5xl ${hover && 'rotate-90 transition-all duration-200'}`} />
                <span className="text-slate-200 font-medium">Create Post</span>
            </button>


            {modalOpen && <CreatePostForm open={modalOpen} onClose={() => setModalOpen(false)} onAdd={onAdd} />}

        </div>
    )
}