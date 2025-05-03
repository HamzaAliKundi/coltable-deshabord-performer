import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const PasswordChangedSuccess = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-[#0D0D0D] rounded-lg p-8">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="rounded-full bg-[#FF00A2]/10 p-3">
              <CheckCircle className="h-6 w-6 text-[#FF00A2]" />
            </div>
          </div>
          <h2 className="text-center text-2xl font-bold text-white font-['Space_Grotesk']">
            Password Changed Successfully
          </h2>
          <p className="text-center text-gray-400 text-sm">
            Your password has been changed successfully. You can now login with your new password.
          </p>
        </div>

        <div className="space-y-4">
          <Link to="/">
            <button className="w-full py-2 px-4 border border-[#FF00A2] text-[#FF00A2] rounded-md hover:bg-[#FF00A2]/10 transition-colors">
              Go to Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PasswordChangedSuccess;