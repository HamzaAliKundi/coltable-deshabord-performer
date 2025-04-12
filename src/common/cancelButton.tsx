import React from "react";

interface CancelButtonProps {
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
}

const CancelButton: React.FC<CancelButtonProps> = ({
  onClick,
  className = "",
  children = "Cancel"
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

export default CancelButton;
