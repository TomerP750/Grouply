import { useTranslation } from "react-i18next";
import { BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";



export function FeedHeader() {

    const navigate = useNavigate();

    const { t } = useTranslation();

    return (
       <button
  onClick={() => navigate("/create-post")}
  className="
    group w-3/4 
    cursor-pointer rounded-2xl
    border px-6 py-6
    bg-slate-50 border-slate-200 text-slate-900
    hover:bg-slate-100 hover:border-blue-400
    dark:bg-slate-900/90 dark:border-slate-800 dark:text-slate-100
    dark:hover:bg-slate-900 dark:hover:border-blue-500/70
    transition-colors duration-200
  "
>
  <div className="flex flex-col items-center gap-2 text-center">
    {/* Icon */}
    <span
      className="
        flex items-center justify-center
        w-10 h-10 rounded-full
        bg-slate-100 text-blue-600
        border border-slate-200
        group-hover:border-blue-400
        dark:bg-slate-800 dark:text-blue-400 dark:border-slate-700
        dark:group-hover:border-blue-500
      "
    >
      <BiPlus className="text-xl" />
    </span>

    {/* Title */}
    <span className="font-medium text-sm sm:text-base">
      {t("Create Post")}
    </span>

    {/* Subtitle */}
    <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
      Start a new post to share your project or idea.
    </span>
  </div>
</button>




    )
}