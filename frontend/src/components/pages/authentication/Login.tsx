import { useForm } from "react-hook-form";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import authService from "../../../service/AuthService";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/AuthSlice";

export type LoginRequestDTO = {
    email: string
    password: string
}

export function Login() {

    const [loading, setLoading] = useState<boolean>(false);

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors } } = useForm<LoginRequestDTO>();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = (data: LoginRequestDTO) => {
        setLoading(true);
        authService.login(data)
            .then(res => {
                localStorage.token = res.token;
                dispatch(login(res.token));
                navigate("/");
            })
            .catch(err => {
                
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <>
            <div className="w-full min-h-screen bg-gray-200 dark:text-white dark:bg-slate-900 flex flex-col items-center justify-center gap-10">

                <NavLink
                    to={"/"}
                    className={"text-white flex items-center gap-2 hover:bg-indigo-500 border border-indigo-500 px-3 py-2 rounded-3xl"}>
                    <BsArrowLeft /> Return to home
                </NavLink>
                <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-5 w-4/5 md:w-2/3 lg:w-1/4">
                    <h1 className="text-center text-3xl font-bold ">Sign in</h1>

                    <div className="flex flex-col">
                        <label>Email</label>
                        <input
                            {...register("email")}
                            type="text"
                            className="rounded-lg bg-gray-300 dark:bg-slate-800 px-3 py-2 focus:ring-1 focus:outline-none focus:ring-indigo-400" />
                    </div>

                    <div className="flex flex-col relative">
                        <label>Password</label>
                        <input
                            {...register("password")}
                            type={showPassword ? "password" : "text"}
                            className="text-white rounded-lg bg-gray-300 dark:bg-slate-800 px-3 py-2 focus:ring-1 focus:outline-none focus:ring-indigo-400" />
                        <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="dark:text-white absolute bottom-2.5 right-2 cursor-pointer">{showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                        </button>
                    </div>

                    <span className="dark:text-white">Dont have account? <NavLink to="/signup" className="font-medium cursor-pointer">Signup</NavLink></span>

                    <button className="bg-indigo-500 hover:bg-indigo-400 rounded-xl cursor-pointer text-white font-medium py-1">Login</button>
                </form>

            </div>
        </>
    )
}