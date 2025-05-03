import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useResetPasswordMutation } from "../../apis/auth";

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch("password");

  const navigate = useNavigate()

  const [resetPassword] = useResetPasswordMutation();

  const onSubmit = async (data: { password: string; confirmPassword: string }) => {
    if (!token) {
      toast.error("Invalid reset link");
      return;
    } 
    setIsLoading(true);
    try {
      const response = await resetPassword({ token, newPassword: data.password, userType: "performer" });
      if (response?.data?.success) {
        toast.success("Password has been reset successfully");
        navigate("password-changed")
      } else {
        toast.error(response?.error?.data?.error || "Failed to reset password");
      }
    } catch (error) {
      console.error("Failed to reset password:", error);
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Enter your new password below
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="password" className="sr-only">
                New Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-[#0D0D0D] rounded-t-md focus:outline-none focus:ring-[#FF00A2] focus:border-[#FF00A2] focus:z-10 sm:text-sm"
                placeholder="New Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-[#FF00A2]">
                  {errors.password.message as string}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-[#0D0D0D] rounded-b-md focus:outline-none focus:ring-[#FF00A2] focus:border-[#FF00A2] focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: value =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-[#FF00A2]">
                  {errors.confirmPassword.message as string}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#FF00A2] hover:bg-[#FF00A2]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF00A2] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Resetting...
                </div>
              ) : (
                "Reset Password"
              )}
            </button>
          </div>

          <div className="text-center">
            <Link
              to="/"
              className="font-medium text-[#FF00A2] hover:text-[#FF00A2]/90"
            >
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;