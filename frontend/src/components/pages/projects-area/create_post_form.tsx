import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "../../elements/Modal";
import type { CreateProjectPostDTO } from "../../../dtos/models_dtos/request_dto/CreateProjectPostDTO";
import type { ProjectDTO } from "../../../dtos/models_dtos/ProjectDTO";
import { useUserSelector } from "../../../redux/hooks";
import projectService from "../../../service/ProjectService";
import { toast } from "react-toastify";
import { BiLoaderAlt } from "react-icons/bi";
import { ProjectPosition } from "../../../dtos/enums/ProjectPosition";

interface CreatePostFormProps {
    open: boolean;
    onClose: () => void;
}

export function CreatePostForm({ open, onClose }: CreatePostFormProps) {
    const [ownedProjects, setOwnedProjects] = useState<ProjectDTO[]>([]);
    const [loadingProjects, setLoadingProjects] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [positions, setPositions] = useState<{ position: ProjectPosition; count: number }[]>([]);
    const [selectedPosition, setSelectedPosition] = useState<ProjectPosition>(ProjectPosition.BACKEND);
    const [count, setCount] = useState(1);

    const user = useUserSelector((s) => s.authSlice.user);

    //   useEffect(() => {
    //     if (!open || !user) return;
    //     setLoadingProjects(true);
    //     projectService
    //       .getUserOwnedProjects(user.id)
    //       .then((res) => setOwnedProjects(res))
    //       .catch((err) => toast.error(err?.response?.data ?? "Failed to load projects"))
    //       .finally(() => setLoadingProjects(false));
    //   }, [open, user?.id]);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateProjectPostDTO>();

    const sendCreation = (data: CreateProjectPostDTO) => {
        // TODO: build payload with positions
    };

    const labelCls = "text-sm font-medium text-slate-700 dark:text-slate-200";
    const inputBase =
        "w-full rounded-md border bg-white px-3 py-2 text-sm " +
        "text-slate-900 outline-none transition " +
        "dark:bg-slate-900 dark:text-slate-100 " +
        "border-slate-300 dark:border-slate-600 " +
        "focus:border-teal-500 focus:ring-2 focus:ring-teal-500/60 focus:ring-offset-0";
    const errorCls = "text-xs text-red-500 mt-1";

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
                <div className="flex-1 overflow-y-auto space-y-5 pr-1 mt-10">
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
                        <span className={labelCls}>Description</span>
                        <textarea
                            rows={8}
                            placeholder="Describe the project and what you’re looking for…"
                            className={`${inputBase} resize-none leading-relaxed`}
                            {...register("description", {
                                required: "Description is required",
                                minLength: { value: 30, message: "At least 30 characters" },
                                maxLength: { value: 300, message: "Max 300 characters" },
                            })}
                            aria-invalid={!!errors.description}
                        />
                        {errors.description && (
                            <span className={errorCls}>{errors.description.message}</span>
                        )}
                    </label>

                    {/* Project select + Positions */}
                    <label className="flex flex-col gap-2">
                        <span className={labelCls}>Choose Project</span>
                        <select
                            className={inputBase}
                            disabled={loadingProjects}
                            {...register("projectId", { required: "Please choose a project" })}
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
                        {errors.projectId && (
                            <span className={errorCls}>{errors.projectId.message}</span>
                        )}

                        {/* Positions (moved directly under project select) */}
                        <div className="flex flex-col gap-2 mt-4">
                            <span className={labelCls}>Positions Needed</span>

                            <div className="flex gap-2">
                                {/* Position select */}
                                <select
                                    // value={selectedPosition}
                                    // onChange={(e) => setSelectedPosition(e.target.value as ProjectPosition)}
                                    className={inputBase}
                                >
                                    {Object.values(ProjectPosition).map((pos) => (
                                        <option key={pos} value={pos}>
                                            {pos}
                                        </option>
                                    ))}
                                </select>

                                {/* Count input */}
                                <input
                                    type="number"
                                    min={1}
                                    max={10}
                                    // value={count}
                                    // onChange={(e) => setCount(Number(e.target.value))}
                                    className={`${inputBase} w-24`}
                                />

                                {/* Add button */}
                                <button
                                    type="button"
                                    // onClick={addPosition}
                                    className="rounded-md bg-teal-600 text-white px-3 py-2 text-sm hover:brightness-110"
                                >
                                    Add
                                </button>
                            </div>

                            {/* Preview list */}
                            {positions.length > 0 && (
                                <ul className="mt-2 space-y-1 text-sm text-slate-700 dark:text-slate-200">
                                    {positions.map((p, idx) => (
                                        <li key={idx} className="flex justify-between items-center">
                                            <span>
                                                {p.count}  {p.position}
                                            </span>
                                            <button
                                                type="button"
                                                // onClick={() => removePosition(idx)}
                                                className="text-red-500 hover:underline text-xs"
                                            >
                                                remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
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
                        className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm
                        dark:text-white cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={submitting || loadingProjects}
                        className="inline-flex items-center justify-center rounded-md bg-teal-600 text-white px-4 py-2 text-sm font-medium
                       hover:brightness-110 disabled:opacity-60 cursor-pointer"
                    >
                        {submitting ? <BiLoaderAlt className="animate-spin" /> : "Create Post"}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
