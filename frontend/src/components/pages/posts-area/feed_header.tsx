import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import type { PostDTO } from "../../../dtos/models_dtos/PostDTO";
import { useNavigate } from "react-router-dom";

interface FeedHeaderProps {
    onAdd: (newPost: PostDTO) => void

}

export function FeedHeader({ onAdd }: FeedHeaderProps) {

    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate("/create-post")}
            className="cursor-pointer flex items-center justify-center w-full 
        bg-gradient-to-r dark:from-slate-900 dark:via-teal-950 dark:to-slate-900 
        from-white via-sky-100 to-indigo-100
        hover-gradient-move border-slate-600/60 
        rounded-2xl p-8 dark:border 
        dark:border-teal-500/20 transition-all duration-200">

            <BiPlus size={50} className={`text-teal-400 text-5xl`} />
            <span className="text-slate-200 font-medium">Create Post</span>

        </button>
    )
}