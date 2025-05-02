import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1A1A1A] rounded-lg p-8">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#FF02A2]/10 flex items-center justify-center">
            <svg className="w-10 h-10 text-[#FF02A2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-white mb-4 font-['Space_Grotesk']">
            Check Your Email
          </h2>

          <p className="text-[#959092] mb-6 font-['Space_Grotesk']">
            We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
          </p>

          <div className="space-y-4">
            {/* <button
              onClick={() => navigate('/verify-email')}
              className="w-full h-12 rounded-lg bg-[#FF02A2] text-white font-['Space_Grotesk'] hover:bg-[#FF02A2]/90 transition-colors"
            >
              Verify Email
            </button> */}

            <button
              onClick={() => navigate('/')}
              className="w-full h-12 rounded-lg border border-[#959092] text-[#959092] font-['Space_Grotesk'] hover:bg-[#959092]/10 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;