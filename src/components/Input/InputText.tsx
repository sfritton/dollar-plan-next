import React, { useCallback } from 'react';
import InputBase, { InputProps } from './InputBase';

interface Props extends Omit<InputProps, 'onChange'> {
  onChange?: (value: string) => void;
}

const InputText: React.FC<Props> = ({ onChange, ...props }) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => onChange?.(event.target.value),
    [onChange],
  );

  return <InputBase onChange={handleChange} {...props} />;
};

export default InputText;
