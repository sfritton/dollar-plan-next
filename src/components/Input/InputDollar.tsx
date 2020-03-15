import React, { useCallback } from 'react';
import InputBase, { InputProps } from './InputBase';
import { getDollarString, getCentNumber, isValidDollar } from '../../util/currency';

interface InputDollarProps extends Omit<InputProps, 'onChange' | 'value'> {
  onChange?: (value: number) => void;
  value?: number;
}

const InputDollar: React.FC<InputDollarProps> = ({ onChange, value, ...props }) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;

      if (!isValidDollar(newValue)) return;

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
      placeholder="0"
      onChange={handleChange}
      value={getDollarString(value)}
      {...props}
    />
  );
};

export default InputDollar;
