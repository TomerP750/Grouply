import { useForm } from "react-hook-form"
import userService from "../../../../service/UserService";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";


const inputStyle = "w-80 rounded-lg border border-gray-500/50 bg-gray-400 dark:bg-gray-800 px-3 py-1";

export interface ChangePasswordDTO {
    password: string,
    confirmPassword: string,
}

export function SecuritySettings() {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors }, setValue, getValues, watch } = useForm<ChangePasswordDTO>();

    const sendUpdate = (data: ChangePasswordDTO) => {

    }

    return (
        <div className="pb-10">

            <form onSubmit={handleSubmit(sendUpdate)} className="p-10 flex flex-col md:flex-row items-center md:items-start px-6 gap-10 overflow-y-auto text-black dark:text-white">
                {/* header */}
                <div className="space-y-2 dark:text-white">
                    <p className="font-semibold text-lg">Change Password</p>
                    <p className="text-gray-400">Settings for update user information</p>
                </div>

                {/* Inputs section */}
                <div className="flex flex-col items-start w-full gap-5">

                    <div className="relative flex flex-col gap-1.5">
                        <label className="font-medium">Password</label>
                        <input
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "At least 6 characters" },
                                maxLength: { value: 15, message: "No more than 15 characters" },
                            })}
                            type={showPassword ? "text" : "password"}
                            className={`${inputStyle} pr-10 focus:ring-2 focus:ring-teal-500 focus:outline-none`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-9 text-gray-500 hover:text-gray-300 dark:text-gray-400 dark:hover:text-white cursor-pointer"
                        >
                            {showPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
                        </button>
                        {errors.password && (
                            <span className="text-sm text-red-400 mt-0.5">{errors.password.message}</span>
                        )}
                    </div>

                    <div className="relative flex flex-col gap-1.5">
                        <label className="font-medium">Confirm Password</label>
                        <input
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                minLength: { value: 6, message: "At least 6 characters" },
                                maxLength: { value: 15, message: "No more than 15 characters" },
                                validate: (val) =>
                                    val === watch("password") || "Passwords do not match",
                            })}
                            type={showConfirmPassword ? "text" : "password"}
                            className={`${inputStyle} pr-10 focus:ring-2 focus:ring-teal-500 focus:outline-none`}
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


                    <button className="text-white cursor-pointer rounded-lg hover:bg-teal-500 bg-teal-600 px-4 py-2">
                        Save
                    </button>

                </div>
            </form>

        </div>
    )
}