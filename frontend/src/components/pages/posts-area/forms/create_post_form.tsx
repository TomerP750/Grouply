import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { BiLoaderAlt } from "react-icons/bi";
import { toast } from "react-toastify";

import type { ProjectPosition } from "../../../../dtos/enums/ProjectPosition";
import type { PostDTO } from "../../../../dtos/models_dtos/PostDTO";
import type { ProjectDTO } from "../../../../dtos/models_dtos/ProjectDTO";
import { CreateProjectPostDTO } from "../../../../dtos/models_dtos/request_dto/CreateProjectPostDTO";
import { useUser } from "../../../../redux/hooks";
import postService from "../../../../service/PostService";
import projectService from "../../../../service/ProjectService";
import { PositionSelectChips } from "../position_chip_select";
import { Navbar } from "../../../layout/navbar/Navbar";





const labelCls = "text-sm font-medium text-slate-700 dark:text-slate-200";
const inputBase =
  "w-full rounded-md border bg-white px-3 py-2 text-sm " +
  "text-slate-900 outline-none transition " +
  "dark:bg-slate-900 dark:text-slate-100 " +
  "border-slate-300 dark:border-slate-600 " +
  "focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60 focus:ring-offset-0";
const errorCls = "text-xs text-red-500 mt-1";


interface CreatePostFormProps {
  open?: boolean;
  onClose?: () => void;
  onAdd?: (dto: PostDTO) => void;
}

export function CreatePostForm({ open, onClose, onAdd }: CreatePostFormProps) {
  const [ownedProjects, setOwnedProjects] = useState<ProjectDTO[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [positions, setPositions] = useState<ProjectPosition[]>([]);

  const user = useUser();

  useEffect(() => {

    if (!open || !user) return;
    setLoadingProjects(true);
    projectService
      .allUserProjectsWithNoPosts()
      .then((res) => {
        console.log(res);

        setOwnedProjects(res)
      })
      .catch((err) => toast.error(err?.response?.data))
      .finally(() => setLoadingProjects(false));

  }, [open]);


  const { register, handleSubmit, reset, formState: { errors }, control, resetField } = useForm<CreateProjectPostDTO>();

  const description = useWatch({ control, name: "description", defaultValue: "" });
  const length = description?.length ?? 0;

  const sendCreation = (data: CreateProjectPostDTO) => {

    setLoading(true);

    const dataToSend: CreateProjectPostDTO = new CreateProjectPostDTO(data.title, data.description, positions, data.projectId)

    postService.createPost(dataToSend)
      .then(res => {
        toast.success("Created Post")
        onClose?.()
        onAdd?.(res)
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
        className="flex flex-col w-1/2 pb-10"
      >
        {/* Body */}
        <div className="flex-1 overflow-y-auto mt-8 sm:mt-10 pr-3 sm:pr-5 space-y-6">

          {/* Positions */}
          <div className="rounded-xl border border-slate-700/60 bg-slate-900/40 p-4 sm:p-5">
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
                className="px-2 py-1 text-xs font-medium rounded-lg bg-teal-600 text-white hover:bg-teal-500 transition"
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
            <span className="text-right text-xs text-slate-400">{length} / 500</span>

            {errors.description && (
              <span className={errorCls}>{errors.description.message}</span>
            )}
          </label>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              reset();
              onClose?.();
            }}
            className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800/60 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading || loadingProjects}
            className="inline-flex items-center justify-center rounded-lg bg-teal-600 text-white px-4 py-2 text-sm font-semibold hover:brightness-110 disabled:opacity-60 transition"
          >
            {loading ? <BiLoaderAlt size={20} className="animate-spin" /> : "Create Post"}
          </button>
        </div>
      </form>
    </div>

  );

}
