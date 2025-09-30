import { useForm } from "react-hook-form";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import authService from "../../../service/AuthService";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/AuthSlice";
import { BiGroup, BiLoader, BiLoaderAlt } from "react-icons/bi";

export type LoginRequestDTO = {
    email: string;
    password: string;
};


export function Login() {
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [checkedRememberMe, setCheckedRememberMe] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors } } = useForm<LoginRequestDTO>();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (data: LoginRequestDTO) => {

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

    };

    return (
        <div className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-white to-slate-100 text-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">

            <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 py-10">

                <NavLink
                    to={"/"}
                    className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-white/70 px-4 py-2 text-sm font-medium text-indigo-700 dark:border-teal-400/40 dark:hover:bg-slate-900 dark:bg-slate-800/60 dark:text-teal-300"
                >
                    <BsArrowLeft /> Return to home
                </NavLink>

                <div className="w-full max-w-md">
                    {/* Card */}
                    <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-xl backdrop-blur dark:border-slate-700/60 dark:bg-slate-900/60">
                        {/* Logo / Title */}
                        <div className="mb-6 flex flex-col items-center text-center">
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500 text-white">
                                <BiGroup size={30} />
                            </div>

                            <h1 className="text-2xl font-bold">Sign in to Grouply</h1>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                                Find a team, ship features, grow your portfolio.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-4">
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="mb-1 block text-sm font-medium">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="you@example.com"
                                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm shadow-sm outline-none ring-indigo-400/0 transition placeholder:text-slate-400 focus:ring-1 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-800"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /[^\s@]+@[^\s@]+\.[^\s@]+/,
                                            message: "Enter a valid email",
                                        },
                                    })}
                                />
                                {errors.email &&
                                    <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>
                                }
                            </div>

                            {/* Password */}
                            <div>
                                <div className="mb-1 flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium">
                                        Password
                                    </label>
                                    <NavLink to="/forgot" className="text-xs text-indigo-600 hover:underline dark:text-teal-400">
                                        Forgot password?
                                    </NavLink>
                                </div>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 pr-10 text-sm outline-none ring-indigo-400/0 transition placeholder:text-slate-400 focus:ring-1 focus:ring-teal-500 dark:border-slate-700 dark:bg-slate-800"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: { value: 6, message: "Minimum 6 characters" },
                                        })}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-2 flex items-center rounded-md px-2 cursor-pointer dark:text-slate-300 dark:hover:text-white"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                    </button>
                                </div>
                                {errors.password &&
                                    <p className="mt-1 text-xs text-rose-500">{errors.password.message}</p>
                                }
                            </div>

                            {/* Remember + Signup */}
                            <div className="mt-1 flex items-center justify-between">
                                <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        className="h-4 aspect-square"
                                        checked={checkedRememberMe}
                                        onChange={(e) => setCheckedRememberMe(e.target.checked)}
                                    />
                                    Remember me
                                </label>
                                <span className="text-sm text-slate-600 dark:text-slate-300">
                                    No account?{" "}
                                    <NavLink to="/signup" className="cursor-pointer font-medium text-teal-600 hover:underline dark:text-teal-400">
                                        Sign up
                                    </NavLink>
                                </span>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="cursor-pointer mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                
                                {loading ? <BiLoaderAlt size={20} className="animate-spin" /> : 'Sign in'}
                            
                            </button>
                        </form>
                    </div>

                    {/* Footer mini-links */}
                    <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
                        © {new Date().getFullYear()} Grouply • Collaborate • Build • Grow
                    </div>
                </div>
            </div>
        </div>
    );
}
