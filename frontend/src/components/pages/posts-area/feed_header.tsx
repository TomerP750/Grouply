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
        className="cursor-pointer flex items-center justify-center w-full bg-gradient-to-r from-slate-800/40 to-slate-700/40 border border-slate-600/60 rounded-2xl p-8 hover:border-teal-500/60 transition-all duration-300">

            <BiPlus size={50} className={`text-teal-400 text-5xl`} />
            <span className="text-slate-200 font-medium">Create Post</span>

        </button>
    )
}