import React from "react";

interface InputValidationErrorProps {
  message?: string;
}
const InputValidationError: React.FC<InputValidationErrorProps> = ({
  message,
}) => {
  if (!message) return null;
  return <div className="text-red-500 text-sm mt-1">{message}</div>;
};

export default InputValidationError;
