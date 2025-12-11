import { useForm, useWatch } from "react-hook-form";
import { useEffect } from "react";
import type { ProfileDTO } from "../../../../dtos/models_dtos/profile_dto";
import { Modal } from "../../../elements/Modal";
import profileService from "../../../../service/profile_service";
import { toast } from "react-toastify";
import "./styles.css";
import { BiLoaderAlt } from "react-icons/bi";



export interface EditProfileRequestDTO {
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

    const { register, handleSubmit, formState: { errors, isSubmitting }, watch, resetField, setValue, control } = useForm<EditProfileRequestDTO>();

    const description = useWatch({ control, name: "about", defaultValue: "" });
    const length = description?.length ?? 0;

    useEffect(() => {
        setValue("about", profile.about)
        setValue("bannerUrl", profile.bannerUrl)
    }, []);

    const handleUpdate = (data: EditProfileRequestDTO) => {

        profileService.updateProfile(data)
            .then(() => {
                toast.success("profile updated");
                onClose();
            })
            .catch(err => {
                toast.error(err.response.data);
            })


    }

    return (
        <Modal width="75%" open={open} onClose={onClose} title="Edit Profile">
            <form onSubmit={handleSubmit(handleUpdate)} className="edit-profile space-y-6 mt-7">

                {/* Banner URL */}
                <div>
                    <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium mb-2">Banner Url</label>
                        <button
                            type="button"
                            onClick={() => resetField("bannerUrl")}
                            className="cursor-pointer text-sm rounded-md px-2 py-1 bg-slate-100 dark:bg-sky-600 hover:bg-slate-200 dark:hover:bg-sky-500 transition"
                            title="Reset banner URL"
                        >
                            Reset
                        </button>
                    </div>
                    <div className="flex flex-col gap-2">

                        <input
                            type="url"
                            className="w-full rounded-md pr-3 py-2 outline-none bg-slate-100 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-sky-500 transition"
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
                        className="cursor-pointer text-sm rounded-md px-2 py-1 bg-slate-100 dark:bg-sky-600 hover:bg-slate-200 dark:hover:bg-sky-500 transition"
                    >
                        Reset
                    </button>
                </div>
                <div className="flex flex-col gap-1">
                    <textarea
                        rows={10}
                        className="resize-none w-full rounded-md px-3 py-2 outline-none bg-slate-100 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-700 focus:ring-1 focus:ring-sky-500 transition"
                        {...register("about", {
                            maxLength: { value: 500, message: "Max 500 characters" },
                        })}
                    />
                    <span className="text-right text-xs dark:text-slate-400 font-medium">{length} / 500</span>
                </div>
                {errors.about && (
                    <p className="mt-1 text-sm text-rose-600">{errors.about.message}</p>
                )}


                {/* Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                        <label className="block text-sm font-medium mb-2">Link 1</label>
                        <input
                            type="url"
                            className="w-full rounded-md px-3 py-2 outline-none bg-slate-100 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-sky-500 transition"
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
                            className="w-full rounded-md px-3 py-2 outline-none bg-slate-100 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-sky-500 transition"
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
                            className="w-full rounded-md px-3 py-2 outline-none bg-slate-100 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-sky-500 transition"
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
                        className="cursor-pointer rounded-md px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white transition"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <BiLoaderAlt size={20} className="animate-spin"/> : "Save Changes"}
                    </button>
                </div>
            </form>
        </Modal>
    );


}