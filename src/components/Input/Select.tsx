import React from 'react';
import styles from './input.module.css';
import IconDropdown from '../../icons/IconDropdown';
import classNames from '../../util/classNames';

interface Props {
  className?: string;
  defaultValue?: string | number;
  label: string;
  onChange?: AnyFunction;
  value?: string;
}

const Select: React.FC<Props> = ({ className = '', children, defaultValue, label, onChange, value }) => (
  <div className={classNames(styles.base, className)}>
    <label className={classNames(styles.label, styles.labelFloating)}>{label}</label>
    <select className={styles.select} value={value} defaultValue={defaultValue} onChange={onChange}>
      {children}
    </select>
    <div className={styles.selectIcon}>
      <IconDropdown />
    </div>
  </div>
);
export default Select;
