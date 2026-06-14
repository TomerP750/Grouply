import { useForm } from "react-hook-form";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { BiGroup, BiLoaderAlt } from "react-icons/bi";
import { toast } from "react-toastify";

import authService from "../api/authService";
import type { SignUpRequestDTO } from "../models/SignUpRequestDto";
import { Input } from "../../../shared/ui/Input";


export function SignUp() {
    
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignUpRequestDTO>();

    const password = watch("password");

    const handleSignUp = async (data: SignUpRequestDTO) => {
        setLoading(true);

        authService
            .signup(data)
            .then(() => {
                toast.success("Account created successfully");
                navigate("/login");
            })
            .catch((err) => {
                toast.error(err.response?.data || "Signup failed");
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

                            <h1 className="text-2xl font-bold">Create your account</h1>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                                Join and start collaborating.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(handleSignUp)} className="flex flex-col gap-4">

                            <div className="grid grid-cols-2 gap-3">
                                <Input
                                    label="First name"
                                    placeholder="John"
                                    error={errors.firstName?.message}
                                    {...register("firstName", {
                                        required: "First name is required",
                                    })}
                                />

                                <Input
                                    label="Last name"
                                    placeholder="Doe"
                                    error={errors.lastName?.message}
                                    {...register("lastName", {
                                        required: "Last name is required",
                                    })}
                                />
                            </div>

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

                            <Input
                                label="Confirm password"
                                type="password"
                                placeholder="••••••••"
                                error={errors.confirmPassword?.message}
                                {...register("confirmPassword", {
                                    required: "Confirm your password",
                                    validate: (value) =>
                                        value === password || "Passwords do not match",
                                })}
                            />

                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-600 disabled:opacity-70"
                            >
                                {loading ? (
                                    <BiLoaderAlt size={20} className="animate-spin" />
                                ) : (
                                    "Create account"
                                )}
                            </button>

                            <p className="text-center text-sm text-slate-600 dark:text-slate-300">
                                Already have an account?{" "}
                                <NavLink to="/login" className="text-sky-500 hover:underline">
                                    Sign in
                                </NavLink>
                            </p>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}