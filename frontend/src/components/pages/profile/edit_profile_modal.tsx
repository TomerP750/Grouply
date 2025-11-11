import { useForm } from "react-hook-form";
import { Modal } from "../../elements/Modal";
import { useEffect } from "react";
import type { ProfileDTO } from "../../../dtos/models_dtos/profile_dto";



interface EditProfileRequestDTO {
    about: string
    bannerUrl: string
    link1: string
    link2: string
    link3: string
}

interface EditProfileModalProps {
    open: boolean
    onClose: () => void
    profile: ProfileDTO
}

export function EditProfileModal({ open, onClose, profile }: EditProfileModalProps) {

    const { register, handleSubmit, formState: { errors, isSubmitting }, watch, resetField, setValue } = useForm<EditProfileRequestDTO>();

    useEffect(() => {
        setValue("about", profile.about)
        setValue("bannerUrl", profile.bannerUrl)
    }, []);

    const handleUpdate = (data: EditProfileRequestDTO) => {

    }

    return (
        <Modal open={open} onClose={onClose} title="Edit Profile">
            <form onSubmit={handleSubmit(handleUpdate)} className="space-y-6 mt-7">

                {/* Banner URL */}
                <div>
                    <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium mb-2">Banner Url</label>
                        <button
                            type="button"
                            onClick={() => resetField("bannerUrl")}
                            className="text-sm rounded-md px-2 py-1 bg-slate-100 dark:bg-teal-600 hover:bg-slate-200 dark:hover:bg-teal-500 transition"
                            title="Reset banner URL"
                        >
                            Reset
                        </button>
                    </div>
                    <div className="flex flex-col gap-2">

                        <input
                            type="url"
                            className="w-full rounded-md pr-3 py-2 outline-none bg-slate-100 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-teal-500 transition"
                            {...register("bannerUrl", {
                                validate: (v) =>
                                    !v || /^https?:\/\//i.test(v) || "Please enter a valid URL",
                            })}
                        />

                    </div>

                    {/* Live preview */}
                    {watch("bannerUrl") && /^https?:\/\//i.test(watch("bannerUrl")!) && (
                        <div className="mt-3 overflow-hidden rounded-lg border">
                            <img
                                src={watch("bannerUrl")!}
                                alt="Banner preview"
                                className="w-full h-40 object-cover"
                                onError={(e) =>
                                    ((e.currentTarget as HTMLImageElement).style.display = "none")
                                }
                            />
                        </div>
                    )}
                </div>


                {/* About */}
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium">About</label>
                    <button
                        type="button"
                        onClick={() => resetField("about")}
                        className="text-sm rounded-md px-2 py-1 bg-slate-100 dark:bg-teal-600 hover:bg-slate-200 dark:hover:bg-teal-500 transition"
                    >
                        Reset
                    </button>
                </div>
                <textarea
                    rows={10}
                    className="resize-none w-full rounded-md px-3 py-2 outline-none bg-slate-100 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-teal-500 transition"
                    {...register("about", {
                        maxLength: { value: 500, message: "Max 500 characters" },
                    })}
                />
                {errors.about && (
                    <p className="mt-1 text-sm text-rose-600">{errors.about.message}</p>
                )}


                {/* Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Link 1</label>
                        <input
                            type="url"
                            className="w-full rounded-md px-3 py-2 outline-none bg-slate-100 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-teal-500 transition"
                            placeholder="https://…"
                            {...register("link1", {
                                validate: (v) => !v || /^https?:\/\//i.test(v) || "Invalid URL",
                            })}
                        />
                        {errors.link1 && (
                            <p className="mt-1 text-sm text-rose-600">{errors.link1.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Link 2</label>
                        <input
                            type="url"
                            className="w-full rounded-md px-3 py-2 outline-none bg-slate-100 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-teal-500 transition"
                            placeholder="https://…"
                            {...register("link2", {
                                validate: (v) => !v || /^https?:\/\//i.test(v) || "Invalid URL",
                            })}
                        />
                        {errors.link2 && (
                            <p className="mt-1 text-sm text-rose-600">{errors.link2.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Link 3</label>
                        <input
                            type="url"
                            className="w-full rounded-md px-3 py-2 outline-none bg-slate-100 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-teal-500 transition"
                            placeholder="https://…"
                            {...register("link3", {
                                validate: (v) => !v || /^https?:\/\//i.test(v) || "Invalid URL",
                            })}
                        />
                        {errors.link3 && (
                            <p className="mt-1 text-sm text-rose-600">{errors.link3.message}</p>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white transition"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </Modal>
    );


}