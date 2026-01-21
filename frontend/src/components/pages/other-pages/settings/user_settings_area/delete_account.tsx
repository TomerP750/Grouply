import { useState } from "react";
import { useForm } from "react-hook-form"
import { FiEye, FiEyeOff } from "react-icons/fi";
import userService from "../../../../../service/user_service";
import { useTranslation } from "react-i18next";


const inputStyle = "w-80 rounded-lg border border-gray-500/50 bg-indigo-200 dark:bg-gray-800 px-3 py-1";

export interface DeleteUserRequestDTO {
    password: string
}

export function DeleteAccount() {

    const { register, handleSubmit, formState: { errors } } = useForm<DeleteUserRequestDTO>();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { t } = useTranslation();

    const handleDeletion = (data: DeleteUserRequestDTO) => {
        userService.deleteUser(data)
            .then()
            .catch()
    }

    return (
        <section className="flex flex-col md:flex-row items-center md:items-start px-6 gap-10 pb-10">

            {/* header */}
            <div className="space-y-2 dark:text-white">
                <p className="font-semibold text-lg">
                    {t("settings.user.delete.title")}
                </p>
                <p className="text-gray-400 max-w-65">
                    {t("settings.user.delete.description")}
                </p>
            </div>

            <form onSubmit={handleSubmit(handleDeletion)} className="dark:text-white space-y-5">

                <div className="relative flex flex-col gap-1.5">
                    <label className="font-medium">
                        {t("settings.user.delete.password")} *
                    </label>

                    <input
                        {...register("password", {
                            required: t("settings.delete.errors.required"),
                            minLength: { value: 6, message: t("settings.user.delete.errors.min") },
                            maxLength: { value: 15, message: t("settings.user.delete.errors.max") }
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
                            {t("settings.user.delete.errors.required")}
                        </span>
                    )}
                </div>

                <button className="mt-4 font-medium text-white bg-red-500 hover:bg-red-400 transition-colors duration-200 px-3 py-1 rounded-xl cursor-pointer">
                    {t("settings.user.delete.button")}
                </button>

            </form>

        </section>
    );

}