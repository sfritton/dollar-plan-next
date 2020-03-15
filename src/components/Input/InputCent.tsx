import React, { useCallback } from 'react';
import InputBase, { InputProps } from './InputBase';
import { getCentNumber, getCentString, isValidCent } from '../../util/currency';

interface InputCentProps extends Omit<InputProps, 'onChange' | 'value'> {
  onChange?: (value: number) => void;
  value?: number;
}

const InputCent: React.FC<InputCentProps> = ({ onChange, value, ...props }) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;

      if (!isValidCent(newValue)) return;

      const newAmount = getCentNumber(newValue);
      onChange?.(newAmount);
    },
    [onChange],
  );
  return (
    <InputBase
      isNumeric
      prefix="$"
      min="0"
      placeholder="0.00"
      onChange={handleChange}
      value={getCentString(value)}
      {...props}
    />
  );
};

export default InputCent;
