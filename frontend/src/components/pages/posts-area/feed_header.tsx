import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import type { PostDTO } from "../../../dtos/models_dtos/post_dto";
import { useNavigate } from "react-router-dom";

interface FeedHeaderProps {
    onAdd: (newPost: PostDTO) => void

}

export function FeedHeader({ onAdd }: FeedHeaderProps) {

    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate("/create-post")}
            className="cursor-pointer flex items-center justify-center w-3/4
        bg-gradient-to-r dark:from-slate-900 dark:via-teal-950 dark:to-slate-900 
        from-indigo-100 via-sky-200 to-indigo-200
        hover-gradient-move border border-indigo-200/80 
        rounded-2xl p-8 
        dark:border-teal-500/20 transition-all duration-200">

            <BiPlus size={50} className={`text-teal-400 text-5xl`} />
            <span className="dark:text-slate-200 font-medium">Create Post</span>

        </button>
    )
}