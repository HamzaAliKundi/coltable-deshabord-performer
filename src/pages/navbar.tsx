import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

interface NavbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Navbar({ isSidebarOpen, toggleSidebar }: NavbarProps) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      setIsLogoutModalOpen(false);
      setIsLoggingOut(false);
      navigate("/");
    }, 2000);
  };

  return (
    <>
      <nav className="bg-black py-2 text-white h-[100px] w-full flex items-center z-30 px-8 md:px-20 justify-between relative">
        {/* Left Logo */}
        <div className="flex items-center space-x-2">
          <Link to="/">
            <img src="/logo.svg" alt="DragSpace Logo" className="h-12" />
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Logout Button - Hide on mobile and when sidebar is open */}
          {!isSidebarOpen && (
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="hidden md:flex items-center gap-2 text-[#888888] hover:text-white transition-colors"
            >
              <img src="/login.svg" alt="Logout" className="w-[19px] h-[20px]" />
              <span className="font-['Space_Grotesk'] text-[16px]">Logout</span>
            </button>
          )}

          {/* Mobile Menu Button */}
          <button onClick={toggleSidebar} className="md:hidden">
            {isSidebarOpen ? <FiX className="w-8 h-8" /> : <FiMenu className="w-8 h-8" />}
          </button>
        </div>
      </nav>

      {/* Logout Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative w-full max-w-md mx-4 bg-black rounded-lg p-8">
            <button 
              onClick={() => setIsLogoutModalOpen(false)}
              className="absolute right-4 top-4 bg-[#747372] hover:bg-gray-700 rounded-full p-1.5 text-gray-300 hover:text-white transition-colors"
            >
              <IoMdClose size={20} />
            </button>

            <h2 className="text-center text-2xl font-bold text-white mb-8 font-['Space_Grotesk']">
              Are you sure you want to logout?
            </h2>

            <div className="flex gap-4">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 h-12 rounded-lg border border-gray-300 text-white font-['Space_Grotesk'] hover:bg-gray-800"
                disabled={isLoggingOut}
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 h-12 rounded-lg bg-white text-black font-['Space_Grotesk'] hover:bg-gray-100 flex items-center justify-center"
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging Out...
                  </>
                ) : (
                  "Logout"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}