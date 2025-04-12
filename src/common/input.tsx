import React from "react";
import {
  UseFormRegister,
  FieldValues,
  RegisterOptions,
  Path,
} from "react-hook-form";

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  type: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  validation?: RegisterOptions<T>;
  className?: string;
  autoFocus?: boolean;
  label?: string;
}

const Input = <T extends FieldValues>({
  name,
  type,
  placeholder = "",
  register,
  validation,
  className = "",
  autoFocus,
  label,
}: InputProps<T>) => {
  return (
    <>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-semibold text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        autoFocus={autoFocus}
        placeholder={placeholder}
        {...register(name, validation)}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      />
    </>
  );
};

export default Input;
