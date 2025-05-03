import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

const PasswordResetEmailSent = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-[#0D0D0D] rounded-lg p-8">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="rounded-full bg-[#FF00A2]/10 p-3">
              <Mail className="h-6 w-6 text-[#FF00A2]" />
            </div>
          </div>
          <h2 className="text-center text-2xl font-bold text-white font-['Space_Grotesk']">
            Check Your Email
          </h2>
          <p className="text-center text-gray-400 text-sm">
            We have sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-center text-sm text-gray-400">
            Didn't receive the email? Check your spam folder or try again.
          </p>
          <div className="flex flex-col space-y-3">
            <Link to="/forgot-password">
              <button className="w-full py-2 px-4 border border-[#FF00A2] text-[#FF00A2] rounded-md hover:bg-[#FF00A2]/10 transition-colors">
                Try Again
              </button>
            </Link>
            <Link to="/">
              <button className="w-full py-2 px-4 text-gray-400 hover:text-white transition-colors">
                Back to Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetEmailSent;