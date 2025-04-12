import React from "react";
import { Search } from "lucide-react";

interface SearchInputProps {
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
}

const SearchTableButton: React.FC<SearchInputProps> = ({
  placeholder = "Search...",
  onChange,
  className = "",
}) => {
  return (
    <div
      className={`flex items-center border rounded-md px-3 py-2 bg-white shadow-md ${className}`}
    >
      <Search className="text-gray-400 mr-2" size={20} />
      <input
        type="text"
        placeholder={placeholder}
        className="flex-grow outline-none bg-transparent text-gray-700 placeholder-gray-400"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchTableButton;
