import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { BiLoaderAlt } from "react-icons/bi";
import { toast } from "react-toastify";

import type { ProjectPosition } from "../../../../dtos/enums/ProjectPosition";
import type { PostDTO } from "../../../../dtos/models_dtos/post_dto";
import type { ProjectDTO } from "../../../../dtos/models_dtos/project_dto";
import { CreateProjectPostDTO } from "../../../../dtos/models_dtos/request_dto/CreateProjectPostDTO";
import { useUser } from "../../../../redux/hooks";
import postService from "../../../../service/post_service";
import projectService from "../../../../service/project_service";
import { PositionSelectChips } from "../position_chip_select";
import { useNavigate } from "react-router-dom";



const labelCls = "text-sm font-medium text-slate-700 dark:text-slate-200";
const inputBase =
  "w-full rounded-md border bg-white px-3 py-2 text-sm " +
  "text-slate-900 outline-none transition " +
  "dark:bg-slate-900 dark:text-slate-100 " +
  "border-slate-300 dark:border-slate-600 " +
  "focus:border-teal-500 focus:ring-2 focus:ring-sky-500 dark:focus:ring-teal-500/60 focus:ring-offset-0";
const errorCls = "text-xs text-red-500 mt-1";


interface CreatePostFormProps {
  onAdd?: (dto: PostDTO) => void;
}

export function CreatePostForm({ onAdd }: CreatePostFormProps) {
  const [ownedProjects, setOwnedProjects] = useState<ProjectDTO[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [positions, setPositions] = useState<ProjectPosition[]>([]);

  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {

    setLoadingProjects(true);
    projectService
      .allUserProjectsWithNoPosts()
      .then((res) => {
        console.log(res);

        setOwnedProjects(res)
      })
      .catch((err) => toast.error(err?.response?.data))
      .finally(() => setLoadingProjects(false));

  }, []);


  const { register, handleSubmit, reset, formState: { errors }, control, resetField } = useForm<CreateProjectPostDTO>();

  const description = useWatch({ control, name: "description", defaultValue: "" });
  const length = description?.length ?? 0;

  const sendCreation = (data: CreateProjectPostDTO) => {

    setLoading(true);

    const dataToSend: CreateProjectPostDTO = new CreateProjectPostDTO(data.title, data.description, positions, data.projectId)

    postService.createPost(dataToSend)
      .then(res => {
        toast.success("Created Post");
        navigate("/");
        onAdd?.(res);
      })
      .catch(err => {
        toast.error(err.response.data);
      })
      .finally(() => {
        setLoading(false);
      })

  };

  return (
    <div className="min-h-screen flex justify-center">
   
      <form
        onSubmit={handleSubmit(sendCreation)}
        className="flex flex-col w-1/2 pb-10 bg-sky-300/10"
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
              disabled={loadingProjects}
              {...register("projectId", { required: "Please choose a project", valueAsNumber: true })}
              aria-invalid={!!errors.projectId}
            >
              <option value="" disabled>
                {loadingProjects ? "Loading projects…" : "Select a project"}
              </option>
              {ownedProjects.map((op) => (
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
              readOnly={length > 500}
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
            disabled={loading || loadingProjects}
            className="disabled:cursor-not-allowed cursor-pointer inline-flex items-center justify-center rounded-lg bg-sky-500 dark:bg-teal-600 text-white px-4 py-2 text-sm font-semibold hover:brightness-110 disabled:opacity-60 transition"
          >
            {loading ? <BiLoaderAlt size={20} className="animate-spin" /> : "Create Post"}
          </button>
        </div>
      </form>
    </div>

  );

}
