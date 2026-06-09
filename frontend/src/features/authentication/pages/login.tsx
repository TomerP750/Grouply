import { useForm } from "react-hook-form";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { BiGroup, BiLoaderAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import authService from "../api/authService";
import type { LoginRequestDTO } from "../model/LoginRequestDto";
import { login } from "../../../shared/store/AuthSlice";
import { Input } from "../../../shared/ui/Input";


export function Login() {

    const [loading, setLoading] = useState<boolean>(false);
    const [checkedRememberMe, setCheckedRememberMe] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginRequestDTO>();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (data: LoginRequestDTO) => {
        setLoading(true);

        authService
            .login(data)
            .then((res) => {
                localStorage.token = res.token;
                dispatch(login(res.token));
                navigate("/");
            })
            .catch((err) => {
                toast.error(err.response?.data || "Login failed");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="min-h-screen overflow-hidden dark:bg-stone-900 text-slate-800 dark:text-slate-100">
            <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 py-10">

                <NavLink
                    to="/"
                    className="mb-8 inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-white/70 px-4 py-2 text-sm font-medium text-sky-600 dark:bg-slate-800/60 dark:text-slate-300"
                >
                    <BsArrowLeft /> Return to home
                </NavLink>

                <div className="w-full max-w-md">
                    <div className="rounded-3xl p-6 shadow-xl backdrop-blur">

                        <div className="mb-6 flex flex-col items-center text-center">
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500 text-white">
                                <BiGroup size={30} />
                            </div>

                            <h1 className="text-2xl font-bold">Sign in to Grouply</h1>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                                Find a team, ship features, grow your portfolio.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-4">

                            <Input
                                label="Email"
                                type="email"
                                placeholder="you@example.com"
                                error={errors.email?.message}
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /[^\s@]+@[^\s@]+\.[^\s@]+/,
                                        message: "Enter a valid email",
                                    },
                                })}
                            />

                            <Input
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                error={errors.password?.message}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Minimum 6 characters",
                                    },
                                })}
                            />

                            {/* Remember + Signup */}
                            <div className="flex items-center justify-between">
                                <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        className="h-4 aspect-square"
                                        checked={checkedRememberMe}
                                        onChange={(e) =>
                                            setCheckedRememberMe(e.target.checked)
                                        }
                                    />
                                    Remember me
                                </label>

                                <NavLink
                                    to="/signup"
                                    className="text-sm text-sky-600 hover:underline dark:text-sky-400"
                                >
                                    Sign up
                                </NavLink>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-600 disabled:opacity-70"
                            >
                                {loading ? (
                                    <BiLoaderAlt size={20} className="animate-spin" />
                                ) : (
                                    "Sign in"
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
                        © {new Date().getFullYear()} Grouply • Collaborate • Build • Grow
                    </div>
                </div>
            </div>
        </div>
    );
}