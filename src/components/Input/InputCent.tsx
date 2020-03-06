import React from 'react';
import InputBase, { InputProps } from './InputBase';

const InputCent: React.FC<InputProps> = props => (
  <InputBase type="number" prefix="$" min="0" placeholder="0.00" {...props} />
);

export default InputCent;
