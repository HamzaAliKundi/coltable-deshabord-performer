import React from "react";
import Select, { Props as SelectProps, ValueType } from "react-select";

interface CustomSelectProps extends SelectProps {
  options: { value: string; label: string }[];
  isDisabled?: boolean;
  placeholder?: string;
  value?: ValueType<{ value: string; label: string }, false>;
  onChange?: (
    selectedOption: ValueType<{ value: string; label: string }, false>
  ) => void;
  name?: string;
}

const customStyles = {
  menu: (base: any) => ({
    ...base,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 100,
    backgroundColor: "#0D0D0D",
    color: "white",
  }),
  control: (base: any, state: any) => ({
    ...base,
    backgroundColor: "#0D0D0D",
    borderRadius: "8px",
    padding: "5px 10px",
    color: "#383838",
    borderColor: state.isFocused ? "#FF00A2" : "#0D0D0D",
    boxShadow: state.isFocused ? "0 0 0 2px #FF00A2" : "none",
  }),
  singleValue: (base: any) => ({
    ...base,
    color: "#fff",
  }),
  placeholder: (base: any) => ({
    ...base,
    color: "#878787",
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isFocused ? "#2c2c2c" : "rgb(56, 56, 56)",
    color: "#fff",
    cursor: "pointer",
    ":active": {
      backgroundColor: "#2c2c2c",
    },
  }),
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  isDisabled = false,
  placeholder = "Select...",
  value,
  onChange,
  name,
}) => {
  return (
    <Select
      options={options}
      isDisabled={isDisabled}
      placeholder={placeholder}
      styles={customStyles}
      className="react-select-container"
      classNamePrefix="react-select"
      value={value}
      onChange={onChange}
      name={name}
    />
  );
};

export default CustomSelect;
