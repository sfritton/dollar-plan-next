import React from "react";
import IconDropdown from "../../icons/IconDropdown";

interface Props {
  className?: string;
  defaultValue?: string | number;
  label: string;
  onChange?: AnyFunction;
  value?: string;
}

const Select: React.FC<Props> = ({
  className = "",
  children,
  defaultValue,
  label,
  onChange,
  value
}) => (
  <div className={`input-base ${className}`}>
    <label className="input-base--label input-base--label--floating">
      {label}
    </label>
    <select
      className="input-base--select"
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
    >
      {children}
    </select>
    <div className="input-base--select-icon">
      <IconDropdown />
    </div>
  </div>
);
export default Select;
