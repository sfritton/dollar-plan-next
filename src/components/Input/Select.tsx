import React, { useCallback } from 'react';
import styles from './input.module.css';
import IconDropdown from '../../icons/IconDropdown';
import classNames from '../../util/classNames';

export interface Props {
  className?: string;
  defaultValue?: string | number;
  label: string;
  onChange?: (value: string) => void;
  value?: string;
}

const Select: React.FC<Props> = ({
  className = '',
  children,
  defaultValue,
  label,
  onChange,
  value,
}) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => onChange?.(event.target.value),
    [onChange],
  );
  return (
    <div className={classNames(styles.base, className)}>
      <label className={classNames(styles.label, styles.labelFloating)}>{label}</label>
      <select
        className={styles.select}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
      >
        {children}
      </select>
      <div className={styles.selectIcon}>
        <IconDropdown />
      </div>
    </div>
  );
};
export default Select;
