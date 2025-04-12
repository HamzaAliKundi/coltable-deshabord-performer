import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  isLoading?: boolean;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  isLoading = false,
  onClick,
  className = "",
  children,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`py-2 px-4 font-medium rounded-lg transition-all duration-500 ease-in-out ${
        isLoading || disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600 text-white"
      } ${className}`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <AiOutlineLoading3Quarters className="animate-spin mx-2" size={24} />
          <span className="animate-wiggle text-sm">Wait...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
