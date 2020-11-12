import React, { useState, useCallback } from 'react';
import classNames from '../../util/classNames';
import styles from './input.module.css';

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
  prefix?: string;
  postfix?: React.ReactNode;
  min?: string;
  isNumeric?: boolean;
}> = ({
  className = '',
  defaultValue,
  prefix,
  postfix,
  label,
  onChange,
  placeholder,
  value,
  min,
  isNumeric,
}) => {
  const [isLabelFloating, setIsLabelFloating] = useState(
    Boolean(placeholder || defaultValue || value),
  );

  const handleChange = useCallback<OnChangeHandler>(
    event => {
      const inputValue = event.target.value;

      setIsLabelFloating(Boolean(inputValue || placeholder));

      onChange && onChange(event);
    },
    [placeholder, setIsLabelFloating, onChange],
  );

  return (
    <div className={classNames({ [styles.numeric]: isNumeric }, styles.base, className)}>
      {prefix && <div className={styles.prefix}>{prefix}</div>}
      <label
        className={classNames({
          [styles.label]: true,
          [styles.labelFloating]: Boolean(isLabelFloating),
          [styles.withPrefix]: Boolean(prefix),
        })}
      >
        {label}
      </label>
      <input
        className={classNames({
          [styles.input]: true,
          [styles.withPrefix]: Boolean(prefix),
          [styles.withPostfix]: Boolean(postfix),
        })}
        type="text"
        inputMode={isNumeric ? 'numeric' : undefined}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        placeholder={placeholder}
        min={min}
      />
      {postfix && <div className={styles.postfix}>{postfix}</div>}
    </div>
  );
};

export default InputBase;
