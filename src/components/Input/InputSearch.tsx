import React, { useCallback, useState } from 'react';
import InputBase, { InputProps } from './InputBase';
import styles from './input-search.module.css';
import IconSearch from '../../icons/IconSearch';

interface Props extends Omit<InputProps, 'onChange' | 'value'> {
  onSubmit?: (value: string) => void;
}

const InputSearch: React.FC<Props> = ({ onSubmit, className, ...props }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value),
    [setSearchTerm],
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit?.(searchTerm);
    },
    [onSubmit, searchTerm],
  );

  return (
    <form onSubmit={handleSubmit} className={className}>
      <InputBase
        className={styles.input}
        onChange={handleChange}
        postfix={
          <button className={styles.submitButton} type="submit">
            <IconSearch size={24} className={styles.icon} />
            <span className={styles.label}>Search</span>
          </button>
        }
        {...props}
      />
    </form>
  );
};

export default InputSearch;
