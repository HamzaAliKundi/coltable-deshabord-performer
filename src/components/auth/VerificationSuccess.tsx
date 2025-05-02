import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const VerificationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1A1A1A] rounded-lg p-8">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-white mb-4 font-['Space_Grotesk']">
            Email Verified!
          </h2>

          <p className="text-[#959092] mb-6 font-['Space_Grotesk']">
            Your email has been successfully verified. Click the button below to login.
          </p>

          <button
            onClick={() => navigate('/')}
            className="w-full h-12 rounded-lg bg-[#FF02A2] text-white font-['Space_Grotesk'] hover:bg-[#FF02A2]/90 transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationSuccess;