import { UseFormRegister, RegisterOptions, Path } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface DropdownProps<T extends Record<string, any>> {
  name: Path<T>; 
  label: string;
  options: Option[];
  register: UseFormRegister<T>;
  validation?: RegisterOptions;
  placeholder?: string;
  className?: string;
}

const Dropdown = <T extends Record<string, any>>({
  name,
  label,
  options,
  register,
  validation,
  placeholder = "Select an option",
  className = "",
}: DropdownProps<T>) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>
      <select
      // @ts-ignore
        {...register(name, validation)}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;