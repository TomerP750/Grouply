import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { BiLoaderAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import projectService from "../../../dashboard/tables/user_tables/projects_table/api/projectService";
import type { ProjectPosition } from "../../../../shared/models/project/ProjectPosition";
import type { PostDTO } from "../../shared/models/PostDto";
import postService from "../api/postService";
import type { ProjectDTO } from "../models/ProjectDto";
import { PositionSelectChips } from "../../shared/ui/PositionChipSelect";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreatePostDTO } from "../models/CreatePostDTO";


const labelCls = "text-sm font-medium text-slate-700 dark:text-slate-200";
const inputBase =
  "w-full rounded-md border bg-white px-3 py-2 text-sm " +
  "text-slate-900 outline-none transition " +
  "dark:bg-stone-900 dark:text-white/80 " +
  "border-slate-300 dark:border-slate-600 " +
  "focus:border-teal-500 focus:ring-2 focus:ring-sky-500 dark:focus:ring-teal-500/60 focus:ring-offset-0";
const errorCls = "text-xs text-red-500 mt-1";


interface CreatePostFormProps {
  onAdd?: (dto: PostDTO) => void;
}

export function CreatePostForm({ onAdd }: CreatePostFormProps) {

  const client = useQueryClient();

  const [positions, setPositions] = useState<ProjectPosition[]>([]);

  const navigate = useNavigate();

  const { data, isFetching } = useQuery<ProjectDTO[]>({
    queryKey: ["userProjectsWithNoPosts"],
    queryFn: () => projectService.allUserProjectsWithNoPosts()
  });

  const { register, handleSubmit, reset,formState: { errors, isSubmitting }, control, resetField }= useForm<CreatePostDTO>();

  const description = useWatch({ control, name: "description", defaultValue: "" });
  const length = description?.length ?? 0;


  const createPostMutation = useMutation({
    
    mutationFn: postService.createPost,

    onSuccess: (res) => {
      toast.success("Created Post");

      client.invalidateQueries({ queryKey: ["posts"] });

      navigate("/");

      onAdd?.(res);
    },

    onError: (err: any) => {
      toast.error(err?.response?.data);
    },
  });
  const sendCreation = (data: CreatePostDTO) => {

    createPostMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex justify-center dark:bg-stone-900">

      <form
        onSubmit={handleSubmit(sendCreation)}
        className="flex flex-col w-1/2 pb-10 pt-25"
      >
        {/* Body */}
        <div className="flex-1 overflow-y-auto mt-5 px-3 sm:px-5 space-y-6">

          <h1 className="text-2xl font-semibold text-center dark:text-slate-200">Create Post</h1>

          {/* Positions */}
          <div className="rounded-xl border border-sky-600/40 dark:border-slate-700/60  p-4 sm:p-5">
            <PositionSelectChips value={positions} onChange={setPositions} max={8} />
          </div>

          {/* Project select */}
          <label className="flex flex-col gap-2">
            <span className={labelCls}>Choose Project</span>
            <select
              defaultValue=""
              className={`${inputBase} bg-slate-800/60 dark:bg-slate-800/60`}
              // disabled={false}
              {...register("projectId", { required: "Please choose a project", valueAsNumber: true })}
              aria-invalid={!!errors.projectId}
            >
              <option value="" disabled>
                {isFetching ? "Loading projects…" : "Select a project"}
              </option>

              {data?.map((op) => (
                <option key={op.id} value={op.id}>
                  {op.name}
                </option>
              ))}

            </select>
            {errors.projectId && <span className={errorCls}>{errors.projectId.message}</span>}
          </label>

          {/* Title */}

          <label className="flex flex-col gap-2">
            <span className={labelCls}>Title</span>
            <input
              type="text"
              placeholder="e.g., Looking for a Backend Developer"
              className={`${inputBase} bg-slate-800/60 dark:bg-slate-800/60`}
              {...register("title", {
                required: "Title is required",
                minLength: { value: 3, message: "At least 3 characters" },
                maxLength: { value: 80, message: "Max 80 characters" },
              })}
              aria-invalid={!!errors.title}
            />
            {errors.title && <span className={errorCls}>{errors.title.message}</span>}
          </label>

          {/* Description */}

          <label className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className={labelCls}>Description</span>
              <button
                type="button"
                onClick={() => resetField("description")}
                className="cursor-pointer px-2 py-1 text-xs font-medium rounded-lg bg-sky-600 hover:bg-sky-500 dark:bg-teal-600 text-white dark:hover:bg-teal-500 transition"
              >
                Reset
              </button>
            </div>

            <textarea
              rows={8}
              placeholder="Describe the project and what you’re looking for…"
              className={`${inputBase} resize-none leading-relaxed bg-slate-800/60 dark:bg-slate-800/60`}
              {...register("description", {
                required: "Description is required",
                minLength: { value: 30, message: "At least 30 characters" },
                maxLength: { value: 500, message: "Max 500 characters" },
              })}
              aria-invalid={!!errors.description}
            />
            <span className="text-right text-xs dark:text-slate-400 font-medium">{length} / 500</span>

            {errors.description && (
              <span className={errorCls}>{errors.description.message}</span>
            )}
          </label>
        </div>

        {/* Buttons */}

        <div className="mt-6 mr-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              reset();
              navigate("/");
            }}
            className="cursor-pointer hover:underline inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm dark:text-slate-300 dark:hover:text-white"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={createPostMutation.isPending}
            className="disabled:cursor-not-allowed cursor-pointer inline-flex items-center justify-center rounded-lg bg-sky-500 dark:bg-teal-600 text-white px-4 py-2 text-sm font-semibold hover:brightness-110 disabled:opacity-60 transition"
          >
            {isSubmitting ? <BiLoaderAlt size={20} className="animate-spin" /> : "Create Post"}
          </button>
        </div>

      </form>
    </div>

  );

}
