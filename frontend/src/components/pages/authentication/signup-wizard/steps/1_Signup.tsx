import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiLoaderAlt } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { useWizardStep } from "../../../../../context/WizardStepContext";
import authService from "../../../../../service/AuthService";
import { useDispatch } from "react-redux";
import { login } from "../../../../../redux/AuthSlice";
import type { SignUpRequestDTO } from "../Dtos/SignUpRequestDTO";

export function SignUp() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, handleSubmit, getValues, formState: { errors } } = useForm<SignUpRequestDTO>();

  const { increment } = useWizardStep();

  // Switch this signup to step wizard
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = (data: SignUpRequestDTO) => {
    setLoading(true);
    authService.signup(data)
      .then(res => {
        dispatch(login(res.token));
        navigate("/");
      })
      .catch(err => {
        console.log(err.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-white to-slate-100 text-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 py-10">
        <NavLink
          to={"/"}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-teal-500/40 bg-white/70 px-4 py-2 text-sm font-medium text-teal-700 dark:border-teal-400/40 dark:hover:bg-slate-900 dark:bg-slate-800/60 dark:text-teal-500"
        >
          <BsArrowLeft /> Return to home
        </NavLink>

        <div className="w-full max-w-xl">
          {/* Card */}
          <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-xl backdrop-blur dark:border-slate-700/60 dark:bg-slate-900/60">
            {/* Title */}
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-bold">Create your Grouply account</h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Join teams, ship features, grow your portfolio.</p>
            </div>

            <form onSubmit={handleSubmit(handleSignUp)} className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="mb-1 block text-sm font-medium">First name</label>
                <input
                  id="firstName"
                  type="text"
                  autoComplete="given-name"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm shadow-sm outline-none ring-indigo-400/0 transition placeholder:text-slate-400 focus:ring-2 dark:border-slate-700 dark:bg-slate-800"
                  {...register("accountDetails.firstName", { required: "First name is required", maxLength: { value: 40, message: "Max 40 chars" } })}
                />
                {errors.accountDetails?.firstName && <p className="mt-1 text-xs text-rose-500">{errors.accountDetails.firstName.message}</p>}
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="mb-1 block text-sm font-medium">Last name</label>
                <input
                  id="lastName"
                  type="text"
                  autoComplete="family-name"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm shadow-sm outline-none ring-indigo-400/0 transition placeholder:text-slate-400 focus:ring-2 dark:border-slate-700 dark:bg-slate-800"
                  {...register("accountDetails.lastName", { required: "Last name is required", maxLength: { value: 40, message: "Max 40 chars" } })}
                />
                {errors.accountDetails?.lastName && <p className="mt-1 text-xs text-rose-500">{errors.accountDetails.lastName.message}</p>}
              </div>

              {/* Username */}
              <div className="sm:col-span-2">
                <label htmlFor="username" className="mb-1 block text-sm font-medium">Username</label>
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  placeholder="dev_jane"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm shadow-sm outline-none ring-indigo-400/0 transition placeholder:text-slate-400 focus:ring-2 dark:border-slate-700 dark:bg-slate-800"
                  {...register("accountDetails.username", {
                    required: "Username is required",
                    minLength: { value: 3, message: "Min 3 characters" },
                    maxLength: { value: 20, message: "Max 20 characters" },
                    pattern: { value: /^[a-zA-Z0-9_]+$/, message: "Letters, numbers, underscore only" },
                  })}
                />
                {errors.accountDetails?.username && <p className="mt-1 text-xs text-rose-500">{errors.accountDetails.username.message}</p>}
              </div>

              {/* Email */}
              <div className="sm:col-span-2">
                <label htmlFor="email" className="mb-1 block text-sm font-medium">Email</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm shadow-sm outline-none ring-indigo-400/0 transition placeholder:text-slate-400 focus:ring-2 dark:border-slate-700 dark:bg-slate-800"
                  {...register("accountDetails.email", {
                    required: "Email is required",
                    pattern: { value: /[^\s@]+@[^\s@]+\.[^\s@]+/, message: "Enter a valid email" },
                  })}
                />
                {errors.accountDetails?.email && <p className="mt-1 text-xs text-rose-500">{errors.accountDetails.email.message}</p>}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="mb-1 block text-sm font-medium">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 pr-10 text-sm shadow-sm outline-none ring-indigo-400/0 transition placeholder:text-slate-400 focus:ring-2 dark:border-slate-700 dark:bg-slate-800"
                    {...register("accountDetails.password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Minimum 6 characters" },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute inset-y-0 right-2 flex items-center rounded-md px-2 text-slate-500 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:text-slate-300"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
                {errors.accountDetails?.password && <p className="mt-1 text-xs text-rose-500">{errors.accountDetails.password.message}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium">Confirm password</label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 pr-10 text-sm shadow-sm outline-none ring-indigo-400/0 transition placeholder:text-slate-400 focus:ring-2 dark:border-slate-700 dark:bg-slate-800"
                    {...register("accountDetails.confirmPassword", {
                      required: "Please confirm your password",
                      validate: (val) =>
                        val === getValues("accountDetails.password") || "Passwords do not match",
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((s) => !s)}
                    className="absolute inset-y-0 right-2 flex items-center rounded-md px-2 text-slate-500 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:text-slate-300"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
                {errors.accountDetails?.confirmPassword && <p className="mt-1 text-xs text-rose-500">{errors.accountDetails.confirmPassword.message}</p>}
              </div>

              {/* Submit */}
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer mt-1 inline-flex w-full 
                                    items-center justify-center gap-2 rounded-xl 
                                    bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 
                                    px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-500 
                                    disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? <BiLoaderAlt size={20} className="animate-spin" /> : 'Create Account'}
                </button>

                {/* <button onClick={increment}>Next Step</button> ** FOR WIZARD */}
              </div>

              {/* Alt */}
              <div className="sm:col-span-2 mt-1 text-center text-sm text-slate-600 dark:text-slate-300">
                Already have an account?{" "}
                <NavLink to="/login" className="font-medium text-teal-600 hover:underline dark:text-teal-400">Sign in</NavLink>
              </div>
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
