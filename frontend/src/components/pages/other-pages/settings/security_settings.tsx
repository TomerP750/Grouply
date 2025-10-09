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
                        <label>Password</label>
                        <input
                            {...register("password")}

                            type={showPassword ? "text" : "password"}
                            className={`${inputStyle}`}

                        />
                        <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-10 cursor-pointer">{showPassword ? <FiEye size={15} /> : <FiEyeOff size={15} />}</button>
                    </div>

                    <div className="relative flex flex-col gap-1.5">
                        <label>Confirm Password</label>
                        <input
                            {...register("confirmPassword")}
                            type={showConfirmPassword ? "text" : "password"}
                            className={`${inputStyle}`}
                        />
                        <button
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-10 cursor-pointer">{showConfirmPassword ? <FiEye size={15} /> : <FiEyeOff size={15} />}</button>

                    </div>

                    <button className="text-white cursor-pointer rounded-lg hover:bg-teal-500 bg-teal-600 px-4 py-2">
                        Save
                    </button>

                </div>
            </form>

        </div>
    )
}