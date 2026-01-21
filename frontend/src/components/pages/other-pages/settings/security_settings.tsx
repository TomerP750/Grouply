import { useForm } from "react-hook-form"
import userService from "../../../../service/user_service";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";


const inputStyle = "w-80 rounded-lg border border-gray-500/50 bg-indigo-200 dark:bg-gray-800 px-3 py-1";

export interface ChangePasswordDTO {
    currentPassword: string,
    password: string,
    confirmPassword: string,
}

export function SecuritySettings() {

    const { t } = useTranslation();

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);


    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, getValues, watch } = useForm<ChangePasswordDTO>();

    const sendUpdate = (data: ChangePasswordDTO) => {
        userService.changePassword(data)
            .then(() => {
                toast.success("Password has been changed");
            })
            .catch(err => {
                toast.error(err.response.data);
            })

    }

    return (
        <div className="pb-10">

            <form
                onSubmit={handleSubmit(sendUpdate)}
                className="p-10 flex flex-col md:flex-row items-center md:items-start px-6 gap-10 overflow-y-auto text-black dark:text-white"
            >
                {/* header */}
                <div className="space-y-2 dark:text-white">
                    <p className="font-semibold text-lg">{t("settings.password.title")}</p>
                    <p className="text-slate-500 dark:text-gray-400">
                        {t("settings.password.description")}
                    </p>
                </div>

                {/* Inputs section */}
                <div className="flex flex-col items-start w-full gap-5">
                    <div className="relative flex flex-col gap-1.5">
                        <label className="font-medium">
                            {t("settings.password.current")} *
                        </label>
                        <input
                            {...register("currentPassword", {
                                required: t("settings.password.errors.required"),
                            })}
                            type={showPassword ? "text" : "password"}
                            className={`${inputStyle} pr-10 focus:ring-1 focus:ring-sky-500 focus:outline-none`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-9 text-gray-500 hover:text-gray-300 dark:text-gray-400 dark:hover:text-white cursor-pointer"
                        >
                            {showPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
                        </button>
                        {errors.password && (
                            <span className="text-sm text-red-400 mt-0.5">
                                {errors.password.message}
                            </span>
                        )}
                    </div>

                    <div className="relative flex flex-col gap-1.5">
                        <label className="font-medium">
                            {t("settings.password.new")} *
                        </label>
                        <input
                            {...register("password", {
                                required: t("settings.password.errors.required"),
                                minLength: {
                                    value: 6,
                                    message: t("settings.password.errors.min"),
                                },
                                maxLength: {
                                    value: 15,
                                    message: t("settings.password.errors.max"),
                                },
                            })}
                            type={showPassword ? "text" : "password"}
                            className={`${inputStyle} pr-10 focus:ring-1 focus:ring-sky-500 focus:outline-none`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-9 text-gray-500 hover:text-gray-300 dark:text-gray-400 dark:hover:text-white cursor-pointer"
                        >
                            {showPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
                        </button>
                        {errors.password && (
                            <span className="text-sm text-red-400 mt-0.5">
                                {errors.password.message}
                            </span>
                        )}
                    </div>

                    <div className="relative flex flex-col gap-1.5">
                        <label className="font-medium">
                            {t("settings.password.confirm")} *
                        </label>
                        <input
                            {...register("confirmPassword", {
                                required: t("settings.password.errors.confirmRequired"),
                                minLength: {
                                    value: 6,
                                    message: t("settings.password.errors.min"),
                                },
                                maxLength: {
                                    value: 15,
                                    message: t("settings.password.errors.max"),
                                },
                                validate: (val) =>
                                    val === watch("password") ||
                                    t("settings.password.errors.match"),
                            })}
                            type={showConfirmPassword ? "text" : "password"}
                            className={`${inputStyle} pr-10 focus:ring-1 focus:ring-sky-500 focus:outline-none`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-9 text-gray-500 hover:text-gray-300 dark:text-gray-400 dark:hover:text-white cursor-pointer"
                        >
                            {showConfirmPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
                        </button>
                        {errors.confirmPassword && (
                            <span className="text-sm text-red-400 mt-0.5">
                                {errors.confirmPassword.message}
                            </span>
                        )}
                    </div>

                    <button className="text-white cursor-pointer rounded-lg hover:bg-sky-500 bg-sky-600 transition-colors duration-200 px-4 py-2">
                        {t("button.save")}
                    </button>
                </div>
            </form>


        </div>
    )
}