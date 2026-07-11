import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { pagePaths } from "../router/pagePaths";
import { registerUserAPI } from "../services/apiCollection";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    console.log("Register:", data);
    // localStorage.setItem("registed",JSON.stringify(data))
    // TODO: integrate with auth API
    const registerUser = await registerUserAPI(data);
    console.log(registerUser);
    if (registerUser?.status === false) {
      alert("registration failed");
      return;
    }
    alert("registered success fully");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa] px-4 py-8">
      <div className="w-full max-w-[350px] flex flex-col items-center">
        {/* Card */}
        <div className="w-full bg-white border border-neutral-200 rounded-lg p-8 mb-4">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src="/assets/header_logo-removebg-preview.png"
              alt="Momentry"
              className="h-12 w-auto text-neutral-900"
            />
          </div>

          <p className="text-center text-neutral-500 text-sm font-medium mb-6">
            Sign up to see photos and videos from your friends.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-md outline-none placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-0"
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-3 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-md outline-none placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-0"
                aria-invalid={errors.fullName ? "true" : "false"}
                {...register("fullName", {
                  required: "Full name is required",
                })}
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-500" role="alert">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Username"
                className="w-full px-3 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-md outline-none placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-0"
                aria-invalid={errors.username ? "true" : "false"}
                {...register("username", {
                  required: "Username is required",
                })}
              />
              {errors.username && (
                <p className="mt-1 text-xs text-red-500" role="alert">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full pl-3 pr-10 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-md outline-none placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-0"
                  aria-invalid={errors.password ? "true" : "false"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500 hover:text-neutral-700 cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4.5 w-4.5" />
                  ) : (
                    <Eye className="h-4.5 w-4.5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500" role="alert">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 mt-1 text-sm font-semibold text-white bg-[#0095f6] hover:bg-[#1877f2] disabled:opacity-60 disabled:pointer-events-none rounded-lg transition-colors"
            >
              {isSubmitting ? "Signing up…" : "Sign up"}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-neutral-500">
            By signing up, you agree to our{" "}
            <span className="text-neutral-700">Terms</span>,{" "}
            <span className="text-neutral-700">Privacy Policy</span> and{" "}
            <span className="text-neutral-700">Cookies Policy</span>.
          </p>
        </div>

        {/* Log in link */}
        <div className="w-full py-4 bg-white border border-neutral-200 rounded-lg text-center">
          <p className="text-sm text-neutral-700">
            Have an account?{" "}
            <Link
              to={pagePaths.login}
              className="font-semibold text-[#0095f6] hover:text-[#1877f2]"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
