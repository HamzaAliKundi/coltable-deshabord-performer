import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForgotPasswordMutation } from "../../apis/auth";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate()

  const onSubmit = async (data: { email: string }) => {
    try {
      setIsLoading(true);
      const response = await forgotPassword({ email: data.email, userType: "performer" });
      if (response?.data?.success) {
        toast.success("Password reset link has been sent to your email");
        navigate("email-sent")
      } else {
        toast.error(response?.error?.data?.error || "Failed to send reset password email");
      }
    } catch (error) {
      console.error("Failed to send reset password email:", error);
      toast.error("Failed to send reset password email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Forgot your password?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-[#0D0D0D] rounded-t-md focus:outline-none focus:ring-[#FF00A2] focus:border-[#FF00A2] focus:z-10 sm:text-sm"
                placeholder="Email address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-[#FF00A2]">
                  {errors.email.message as string}
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
                  Sending...
                </div>
              ) : (
                "Send Reset Link"
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

export default ForgotPassword;