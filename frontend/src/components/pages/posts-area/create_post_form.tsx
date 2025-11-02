import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { BiLoaderAlt, BiTrash } from "react-icons/bi";
import { toast } from "react-toastify";
import { ProjectPosition } from "../../../dtos/enums/ProjectPosition";
import type { PostDTO } from "../../../dtos/models_dtos/PostDTO";
import { ProjectDTO } from "../../../dtos/models_dtos/ProjectDTO";
import { CreateProjectPostDTO } from "../../../dtos/models_dtos/request_dto/CreateProjectPostDTO";
import { useUserSelector } from "../../../redux/hooks";
import projectPostService from "../../../service/PostService";
import projectService from "../../../service/ProjectService";
import { Modal } from "../../elements/Modal";
import { PositionSelectChips } from "./position_chip_select";





const labelCls = "text-sm font-medium text-slate-700 dark:text-slate-200";
const inputBase =
  "w-full rounded-md border bg-white px-3 py-2 text-sm " +
  "text-slate-900 outline-none transition " +
  "dark:bg-slate-900 dark:text-slate-100 " +
  "border-slate-300 dark:border-slate-600 " +
  "focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60 focus:ring-offset-0";
const errorCls = "text-xs text-red-500 mt-1";


interface CreatePostFormProps {
  open: boolean;
  onClose: () => void;
  onAdd: (dto: PostDTO) => void;
}

export function CreatePostForm({ open, onClose, onAdd }: CreatePostFormProps) {
  const [ownedProjects, setOwnedProjects] = useState<ProjectDTO[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [positions, setPositions] = useState<ProjectPosition[]>([]);

  const user = useUserSelector(state => state.authSlice.user);

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
    
    projectPostService.createPost(dataToSend)
      .then(res => {
        toast.success("Created Post")
        onClose()
        onAdd(res)
      })
      .catch(err => {
        toast.error(err.response.data);
      })
      .finally(() => {
        setLoading(false);
      })

  };

  return (
    <Modal
      open={open}
      onClose={() => {
        reset();
        onClose();
      }}
      title="Create Post"
    >
      <form
        onSubmit={handleSubmit(sendCreation)}
        className="flex min-h-[40vh] max-h-[70vh] flex-col"
      >
        {/* Body */}
        <div className="flex-1 overflow-y-auto space-y-5 mt-10 pr-5">


          {/* Positions */}
          <PositionSelectChips
            value={positions}
            onChange={setPositions}
            max={8} 
          />

          {/* Project select + Positions */}
          <label className="flex flex-col gap-2">
            <span className={labelCls}>Choose Project</span>
            <select
              defaultValue={""}
              className={inputBase}
              disabled={loadingProjects}
              {...register("projectId", { required: "Please choose a project" })}
              aria-invalid={!!errors.projectId}
            >
              <option value="">
                {loadingProjects ? "Loading projects…" : "Select a project"}
              </option>
              {ownedProjects.map((op) => (
                <option key={op.id} value={op.id}>
                  {op.name}
                </option>
              ))}
            </select>
            {errors.projectId && (
              <span className={errorCls}>{errors.projectId.message}</span>
            )}
          </label>


          {/* Title */}
          <label className="flex flex-col gap-2">
            <span className={labelCls}>Title</span>
            <input
              type="text"
              placeholder="e.g., Looking for a Backend Developer"
              className={inputBase}
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
            <div className="flex justify-between items-center">
              <span className={labelCls}>Description</span>
              <button type="button" onClick={() => resetField("description")} className="text-white px-2 py-1 bg-teal-600 rounded-lg hover:bg-teal-500 cursor-pointer">Reset</button>
            </div>
            <textarea
              rows={8}
              readOnly={length > 500}
              placeholder="Describe the project and what you’re looking for…"
              className={`${inputBase} resize-none leading-relaxed`}
              {...register("description", {
                required: "Description is required",
                minLength: { value: 30, message: "At least 30 characters" },
                maxLength: { value: 500, message: "Max 500 characters" },
              })}
              aria-invalid={!!errors.description}
            />

            <span className="text-right text-gray-300 text-xs">{length} / 500</span>

            {errors.description && (
              <span className={errorCls}>{errors.description.message}</span>
            )}
          </label>

          
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => {
              reset();
              onClose();
            }}
            className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm dark:text-white cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || loadingProjects}
            className="inline-flex items-center justify-center rounded-md bg-teal-600 text-white px-4 py-2 text-sm font-medium hover:brightness-110 disabled:opacity-60 cursor-pointer"
          >
            {loading ? <BiLoaderAlt size={20} className="animate-spin" /> : "Create Post"}
          </button>
        </div>
      </form>

    </Modal>
  );
}
