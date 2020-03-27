import React, { useCallback } from 'react';
import styles from './checkbox.module.css';
import classNames from '../../util/classNames';
import IconSave from '../../icons/IconSave';

export interface Props {
  className?: string;
  label: string;
  onChange?: (value: boolean) => void;
  checked?: boolean;
}

const Checkbox: React.FC<Props> = ({ className = '', checked, label, onChange }) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => onChange?.(event.target.checked),
    [onChange],
  );
  return (
    <div className={className}>
      <label className={styles.label}>
        <span className={classNames({ [styles.checked]: checked }, styles.visualCheckbox)}>
          {checked && <IconSave className={styles.checkMark} size={16} />}
        </span>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={checked}
          onChange={handleChange}
        />
        <span>{label}</span>
      </label>
    </div>
  );
};
export default Checkbox;
