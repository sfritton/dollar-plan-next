import React, { useState, useCallback } from "react";
import classNames from "../../util/classNames";
import "./input.css";

type OnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;

export interface InputProps {
  className?: string;
  defaultValue?: string;
  label: string;
  onChange?: OnChangeHandler;
  placeholder?: string;
  value?: string;
}

const InputBase: React.FC<InputProps & {
  type: string;
  prefix?: string;
  min?: string;
}> = ({
  className = "",
  defaultValue,
  prefix,
  label,
  onChange,
  placeholder,
  type,
  value,
  min
}) => {
  const [isLabelFloating, setIsLabelFloating] = useState(
    Boolean(placeholder || defaultValue || value)
  );

  const handleChange = useCallback<OnChangeHandler>(
    event => {
      const inputValue = event.target.value;

      setIsLabelFloating(Boolean(inputValue || placeholder));

      onChange && onChange(event);
    },
    [placeholder, setIsLabelFloating, onChange]
  );

  return (
    <div className={`input-base ${className}`}>
      {prefix && <div className="input-base--prefix">{prefix}</div>}
      <label
        className={classNames({
          "input-base--label": true,
          "input-base--label--floating": Boolean(isLabelFloating),
          "input-base--with-prefix": Boolean(prefix)
        })}
      >
        {label}
      </label>
      <input
        className={classNames({
          "input-base--input": true,
          "input-base--with-prefix": Boolean(prefix)
        })}
        type={type}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        placeholder={placeholder}
        min={min}
      />
    </div>
  );
};

export default InputBase;
