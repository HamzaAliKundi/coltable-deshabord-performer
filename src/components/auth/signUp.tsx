import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import LoginModal from './index';
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useSignupMutation } from "../../apis/auth";

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [signup] = useSignupMutation();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const res:any = await signup(data);
      if(res?.data?.success === true) {
        toast.success("Signup successful, login Now");
      } else {
        toast.error(res?.error?.data?.error);
      }
    } catch (error) {
      toast.error("An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  } 

  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center bg-black"
        style={{
          backgroundImage: "url('/auth/signup-bg.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full max-w-3xl px-4 py-8">
          <h1 className="text-center text-2xl font-bold text-white mb-8 font-['Space_Grotesk'] uppercase">
            New User Registration
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label
                  className="block text-[#959092] font-['Space_Grotesk'] font-normal text-base mb-2"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="type name..."
                  className="w-full h-12 rounded-lg border border-gray-300 px-5 py-3.5 bg-white text-black font-['Space_Grotesk']"
                  {...register("firstName", { required: true })}
                />
                {errors.firstName && (
                  <span className="text-red-500 text-xs mt-1">
                    First name is required
                  </span>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label
                  className="block text-[#959092] font-['Space_Grotesk'] font-normal text-base mb-2"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="type name..."
                  className="w-full h-12 rounded-lg border border-gray-300 px-5 py-3.5 bg-white text-black font-['Space_Grotesk']"
                  {...register("lastName", { required: true })}
                />
                {errors.lastName && (
                  <span className="text-red-500 text-xs mt-1">
                    Last name is required
                  </span>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  className="block text-[#959092] font-['Space_Grotesk'] font-normal text-base mb-2"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="your number..."
                  className="w-full h-12 rounded-lg border border-gray-300 px-5 py-3.5 bg-white text-black font-['Space_Grotesk']"
                  {...register("phone", { required: true })}
                />
                {errors.phone && (
                  <span className="text-red-500 text-xs mt-1">
                    Phone Number is required
                  </span>
                )}
              </div>

              {/* User Type */}
              <div>
                <label
                  className="block text-[#959092] font-['Space_Grotesk'] font-normal text-base mb-2"
                  htmlFor="userType"
                >
                  User type
                </label>
                <div className="relative">
                  <select
                    id="userType"
                    className="w-full h-12 rounded-lg border border-gray-300 px-5 py-3.5 bg-white text-black font-['Space_Grotesk'] appearance-none"
                    {...register("userType", { required: true })}
                  >
                    <option value="performer">Performer</option>
                    <option value="venues">Venues</option>
                    <option value="users">Users</option>
                  </select>
                  <div className="absolute right-3 top-3.5 pointer-events-none">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="#959092"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                {errors.userType && (
                  <span className="text-red-500 text-xs mt-1">
                    User type is required
                  </span>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  className="block text-[#959092] font-['Space_Grotesk'] font-normal text-base mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="abc@xyz.com..."
                  className="w-full h-12 rounded-lg border border-gray-300 px-5 py-3.5 bg-white text-black font-['Space_Grotesk']"
                  {...register("email", {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  })}
                />
                {errors.email && (
                  <span className="text-red-500 text-xs mt-1">
                    Valid email is required
                  </span>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  className="block text-[#959092] font-['Space_Grotesk'] font-normal text-base mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    placeholder="type here..."
                    className="w-full h-12 rounded-lg border border-gray-300 px-5 py-3.5 bg-white text-black font-['Space_Grotesk']"
                    {...register("password", {
                      required: true,
                      minLength: 8,
                      pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])/,
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3.5"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? (
                      <FaEyeSlash className="text-gray-600" />
                    ) : (
                      <FaEye className="text-gray-600" />
                    )}
                  </button>
                </div>
                <p className="text-[#959092] text-xs mt-1 font-['Space_Grotesk']">
                  Password is Required To Have Atleast 8 Characters, One Number
                  And One Special Character
                </p>
                {errors.password && (
                  <span className="text-red-500 text-xs mt-1">
                    Password must meet requirements
                  </span>
                )}
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center justify-center mt-6">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 accent-[#FF00A2] bg-transparent border border-[#959092] rounded cursor-pointer"
                {...register("terms", { required: true })}
              />
              <label
                htmlFor="terms"
                className="ml-2 text-[#959092] text-sm font-['Space_Grotesk'] cursor-pointer select-none"
              >
                Agree to our Terms of Service, Privacy Policy, and Cookies
                Policy.
              </label>
            </div>
            {errors.terms && (
              <span className="text-red-500 text-xs mt-1 block text-center">
                You must agree to the terms
              </span>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center mt-5 gap-4">
              <button
                type="button"
                className="w-full md:w-64 h-13 rounded-l-full bg-white text-[#FF00A2] py-2.5 px-4 font-['Space_Grotesk']"
                onClick={() => setIsLoginModalOpen(true)}
                disabled={isLoading}
              >
                Login
              </button>
              <button
                type="submit"
                className="w-full md:w-64 h-13 rounded-r-full bg-[#FF00A2] text-white py-2.5 px-4 font-['Space_Grotesk'] flex items-center justify-center"
                style={{ backgroundColor: "#FF00A2" }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing Up...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>

            <p className="text-center text-[#959092] text-xs mt-4 font-['Space_Grotesk']">
              If you have already an account please login!
            </p>

            {/* Google Login */}
            <div className="flex justify-center mt-6">
              <Link
              to="/profile"
                type="button"
                className="flex items-center justify-center gap-2 w-full max-w-lg h-12 rounded-full border border-[#959092] bg-white text-black hover:bg-gray-100 transition-colors px-5 py-3.5 font-['Space_Grotesk']"
              >
                <span>Login With Google</span>
                <FcGoogle size={20} />
              </Link>
            </div>
          </form>
        </div>
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};

export default Signup;