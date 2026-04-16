import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../app/Services/authApi";
import { setCredentials } from "../../Utils/AuthSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function Login({ setUserToken }) {
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    setValue,
    formState: { errors },
  } = useForm();

  const handleLogin = async (e) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setCredentials(res));
    } catch (error) {
      if (error.status == 401 || error.status == 422) {
        setError("password", { type: "custom", message: error?.data?.message });
      }
      if (error.status == 404) {
        setError("email", { type: "custom", message: error?.data?.message });
      }
      toast.error(error.data.message);
    }
  };

  const onChange = (e) => {
    clearErrors(e.target.name);
    setValue(e.target.name, e.target.value);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <section className="relative m-5 min-h-[70svh] overflow-hidden rounded-[24px] border border-[#f8d06f]/20 bg-[linear-gradient(135deg,rgba(8,21,35,0.96)_0%,rgba(10,28,45,0.93)_55%,rgba(8,17,29,0.98)_100%)] shadow-[0_24px_48px_rgba(0,0,0,0.35)] md:mx-auto lg:w-1/2">
      <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(248,208,111,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(248,208,111,0.05)_1px,transparent_1px)] [background-size:34px_34px]" />
      <div className="pointer-events-none absolute -left-20 -top-16 h-56 w-56 animate-pulse rounded-full bg-[radial-gradient(circle,rgba(248,208,111,0.42)_0%,rgba(248,208,111,0)_72%)] blur-[55px]" />
      <div className="pointer-events-none absolute -bottom-20 -right-24 h-60 w-60 animate-pulse rounded-full bg-[radial-gradient(circle,rgba(43,163,255,0.36)_0%,rgba(43,163,255,0)_72%)] blur-[55px]" />

      <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-10">
        <p className="inline-flex rounded-full border border-[#f8d06f]/45 bg-[#081623]/75 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f8d06f]">
          Tolaram Premier League
        </p>
        <h2 className="mt-5 text-3xl font-black uppercase tracking-[0.02em] text-[#fff3d2] sm:text-4xl">
          Welcome Back
        </h2>
        <p className="mt-2 text-sm text-[#cfd7e8] sm:text-base">
          Log in to place bets, track match momentum, and stay ahead on the
          leaderboard.
        </p>
      </div>

      <div className="relative z-10 px-6 pb-8 sm:px-10 sm:pb-10">
        <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
          <div>
            <label
              htmlFor="email"
              className="block text-left text-sm font-semibold leading-6 uppercase tracking-[0.1em] text-[#f5dfaa]"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="email"
                {...register("email", {
                  required: "Please enter username",
                })}
                name="email"
                type="text"
                autoComplete="username"
                value={data?.email}
                onChange={onChange}
                className={`w-full rounded-xl border bg-[rgba(8,20,34,0.82)] px-3 py-[11px] text-sm text-[#f6f1e7] placeholder-[#9db0c4] transition-all duration-200 focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-[rgba(255,96,96,0.75)] ring-[rgba(255,96,96,0.14)]"
                    : "border-[rgba(248,208,111,0.22)] focus:border-[rgba(248,208,111,0.72)] focus:ring-[rgba(248,208,111,0.16)]"
                }`}
              />
              {errors.email && (
                <p className="mt-2 text-left text-xs text-[#ff8f8f]">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-semibold leading-6 uppercase tracking-[0.1em] text-[#f5dfaa]"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <div className="relative">
              <input
                id="password"
                {...register("password", {
                  required: "Please enter password",
                })}
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={data?.password}
                onChange={onChange}
                className={`w-full rounded-xl border bg-[rgba(8,20,34,0.82)] px-3 py-[11px] pr-16 text-sm text-[#f6f1e7] placeholder-[#9db0c4] transition-all duration-200 focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-[rgba(255,96,96,0.75)] ring-[rgba(255,96,96,0.14)]"
                    : "border-[rgba(248,208,111,0.22)] focus:border-[rgba(248,208,111,0.72)] focus:ring-[rgba(248,208,111,0.16)]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#f5dfaa]/90 transition-colors hover:text-[#f8d06f]"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <EyeIcon className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-left text-xs text-[#ff8f8f]">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-full border border-[#f8d06f]/30 bg-gradient-to-r from-[#f8d06f] to-[#e3aa39] px-3 py-3 text-sm font-black uppercase tracking-[0.16em] text-[#201603] shadow-[0_10px_30px_rgba(248,208,111,0.24)] transition-all duration-300 hover:translate-y-[-1px] hover:shadow-[0_14px_36px_rgba(248,208,111,0.35)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
