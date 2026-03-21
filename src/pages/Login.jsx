import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { pagePaths } from "../router/pagePaths";
import { loginUserAPI } from "../services/apiCollection";

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleLogin = async (data) => {
    console.log("Login:", data);
    let login = await loginUserAPI(data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa] px-4 py-8">
      <div className="w-full max-w-[350px] flex flex-col items-center">
        {/* Card */}
        <div className="w-full bg-white border border-neutral-200 rounded-lg p-8 mb-4">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img
              src="/assets/header_logo-removebg-preview.png"
              alt="Momentry"
              className="h-12 w-auto text-neutral-900"
            />
          </div>

          <form
            onSubmit={handleSubmit(handleLogin)}
            className="flex flex-col gap-3"
          >
            <div>
              <input
                type="text"
                placeholder="Phone number, username, or email"
                className="w-full px-3 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-md outline-none placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-0"
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email", {
                  required: "This field is required",
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
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-md outline-none placeholder:text-neutral-400 focus:border-neutral-400 focus:ring-0"
                aria-invalid={errors.password ? "true" : "false"}
                {...register("password", {
                  required: "This field is required",
                })}
              />
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
              {isSubmitting ? "Logging in…" : "Log in"}
            </button>
          </form>
        </div>

        {/* Sign up link */}
        <div className="w-full py-4 bg-white border border-neutral-200 rounded-lg text-center">
          <p className="text-sm text-neutral-700">
            Don&apos;t have an account?{" "}
            <Link
              to={pagePaths.register}
              className="font-semibold text-[#0095f6] hover:text-[#1877f2]"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
