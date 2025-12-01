import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { BiLoaderAlt } from "react-icons/bi";
import { toast } from "react-toastify";
import type { ProjectPosition } from "../../../../dtos/enums/ProjectPosition";
import type { PostDTO } from "../../../../dtos/models_dtos/post_dto";
import type { ProjectDTO } from "../../../../dtos/models_dtos/project_dto";
import { useUserSelector } from "../../../../redux/hooks";
import projectService from "../../../../service/project_service";
import { Modal } from "../../../elements/Modal";
import { PositionSelectChips } from "../position_chip_select";
import postService from "../../../../service/post_service";

const labelCls = "text-sm font-medium text-slate-700 dark:text-slate-200";
const inputBase =
  "w-full rounded-lg border bg-white px-3 py-2.5 text-sm " +
  "text-slate-900 outline-none transition " +
  "dark:bg-slate-900 dark:text-slate-100 " +
  "border-slate-300 dark:border-slate-600 " +
  "focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60 focus:ring-offset-0";
const errorCls = "text-xs text-red-500 mt-1";

export interface EditPostRequestDTO {
  title: string;
  description: string;
  projectId: number;
}

interface EditPostFormModalProps {
  post: PostDTO;
  open: boolean;
  onClose: () => void;
}

export function EditPostFormModal({ open, onClose, post }: EditPostFormModalProps) {
  const [ownedProjects, setOwnedProjects] = useState<ProjectDTO[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [positions, setPositions] = useState<ProjectPosition[]>([]);

  const user = useUserSelector((state) => state.authSlice.user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    resetField,
    setValue,
  } = useForm<EditPostRequestDTO>();

  useEffect(() => {
    setValue("title", post.title);
    setValue("description", post.description);
    setValue("projectId", post.projectDTO.id);
  }, [post, setValue]);

  useEffect(() => {
    if (!open || !user) return;
    setLoadingProjects(true);
    projectService
      .allUserProjectsWithNoPosts()
      .then((res) => setOwnedProjects(res))
      .catch((err) => toast.error(err?.response?.data))
      .finally(() => setLoadingProjects(false));
  }, [open, user]);

  const description = useWatch({ control, name: "description", defaultValue: "" });
  const length = description?.length ?? 0;

  const sendUpdate = (data: EditPostRequestDTO) => {
    setLoading(true);
    const dataToSend: EditPostRequestDTO = {
      title: data.title,
      description: data.description,
      projectId: data.projectId,
    };

    postService
      .editPost(dataToSend)
      .then(() => {
        toast.success("Created Post");
        onClose();
      })
      .catch((err) => {
        toast.error(err.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        reset();
        onClose();
      }}
      title="Edit Post"
    >
      <form
        onSubmit={handleSubmit(sendUpdate)}
        className="flex min-h-[40vh] max-h-[70vh] flex-col"
      >
        {/* Small subtitle / helper text */}
        <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Update your post details, choose a project, and adjust what roles you’re looking for.
        </p>

        {/* Body */}
        <div className="mt-4 flex-1 space-y-6 overflow-y-auto pr-1 sm:pr-3 lg:pr-4">

          {/* Project + Positions card */}
          <section className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-4 dark:border-slate-700 dark:bg-slate-900/40">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                Project & Positions
              </h3>
              {loadingProjects && (
                <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <BiLoaderAlt className="animate-spin" size={14} />
                  Loading projects…
                </span>
              )}
            </div>

            {/* Project select */}
            <label className="flex flex-col gap-2">
              <span className={labelCls}>Choose Project</span>
              <select
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

            {/* Positions */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className={labelCls}>Positions you’re looking for</span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500">
                  Up to 8 positions
                </span>
              </div>

              <div className="rounded-lg border border-dashed border-slate-300 bg-white/70 px-2 py-2.5 dark:border-slate-700 dark:bg-slate-900/60">
                <PositionSelectChips
                  value={positions}
                  onChange={setPositions}
                  max={8}
                />
              </div>
            </div>
          </section>

          {/* Content card */}
          <section className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-4 dark:border-slate-700 dark:bg-slate-900/40">
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
              <div className="flex items-center justify-between">
                <span className={labelCls}>Description</span>
                <button
                  type="button"
                  onClick={() => resetField("description")}
                  className="cursor-pointer rounded-md border border-teal-600 px-2 py-1 text-xs font-medium text-teal-700 transition hover:bg-teal-50 dark:border-teal-500 dark:text-teal-300 dark:hover:bg-teal-500/10"
                >
                  Reset
                </button>
              </div>

              <textarea
                rows={7}
                readOnly={length > 500}
                placeholder="Describe the project and what you’re looking for…"
                className={`${inputBase} resize-none leading-relaxed min-h-[140px]`}
                {...register("description", {
                  required: "Description is required",
                  minLength: { value: 30, message: "At least 30 characters" },
                  maxLength: { value: 500, message: "Max 500 characters" },
                })}
                aria-invalid={!!errors.description}
              />

              <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                <span>Be clear, friendly and specific.</span>
                <span
                  className={
                    length > 500
                      ? "font-semibold text-red-500"
                      : length > 450
                      ? "font-medium text-amber-500"
                      : "text-slate-400 dark:text-slate-500"
                  }
                >
                  {length} / 500
                </span>
              </div>

              {errors.description && (
                <span className={errorCls}>{errors.description.message}</span>
              )}
            </label>
          </section>
        </div>

        {/* Buttons */}
        <div className="mt-5 border-t border-slate-200 pt-4 dark:border-slate-800">
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              className="inline-flex items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || loadingProjects}
              className="inline-flex items-center justify-center rounded-md bg-sky-500 dark:bg-teal-600 px-4 py-2 text-sm font-medium text-white transition hover:brightness-110 disabled:opacity-60 cursor-pointer"
            >
              {loading ? <BiLoaderAlt size={20} className="animate-spin" /> : "Edit Post"}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
