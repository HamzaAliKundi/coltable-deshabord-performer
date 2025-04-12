import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

interface NavbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Navbar({ isSidebarOpen, toggleSidebar }: NavbarProps) {
  return (
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
          <Link
            to="#"
            className="hidden md:flex items-center gap-2 text-[#888888] hover:text-white transition-colors"
          >
            <img src="/login.svg" alt="Logout" className="w-[19px] h-[20px]" />
            <span className="font-['Space_Grotesk'] text-[16px]">Logout</span>
          </Link>
        )}

        {/* Mobile Menu Button */}
        <button onClick={toggleSidebar} className="md:hidden">
          {isSidebarOpen ? <FiX className="w-8 h-8" /> : <FiMenu className="w-8 h-8" />}
        </button>
      </div>
    </nav>
  );
}